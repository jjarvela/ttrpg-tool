import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import {
  findUserBySocket,
  getUserById,
  updateUser,
} from "./prisma/services/userService";
import { getServerMembersExcept } from "./prisma/services/serverService";
import { createNotification } from "./prisma/services/notificationService";
import {
  getConversationByUid,
  getConversationParticipants,
} from "./prisma/services/conversationService";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST_NAME || "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("send-user", (user_id: string) => {
      console.log("updating user");
      socket.data.userId = user_id;
      //when user has connected, add user's socket id to db (can be used to send events and check active status)
      updateUser(user_id, { socket_id: socket.id }).then((user) => {
        return;
      });
    });

    socket.on(
      "send-message",
      async (data: {
        user_id: string;
        message_id: string;
        conversation_id: string;
      }) => {
        console.log(data.conversation_id);
        const conversation = await getConversationByUid(
          data.conversation_id,
          false,
          true,
        );
        const participants = await getConversationParticipants(
          data.conversation_id,
        );
        if (
          typeof participants !== "string" &&
          conversation &&
          typeof conversation !== "string"
        ) {
          participants.forEach(async (participant) => {
            if (participant.participant_id === data.user_id) return;
            const recipient = await getUserById(participant.participant_id, {
              socket_id: true,
            });
            const notification = await createNotification({
              recipient_id: participant.participant_id,
              type: "chat-message",
              read_status: false,
              message_id: data.message_id,
              conversation_id: data.conversation_id,
              channel_id: conversation.channel_id || undefined,
              server_id: conversation.channel?.server_id || undefined,
            });
            console.log(notification);
            if (recipient && typeof recipient !== "string") {
              //if recipient has a socket_id set, send event to their socket
              recipient.socket_id &&
                socket.to(recipient.socket_id).emit("client-refresh");
            } else {
              //if recipient returned error, send error event to sender's client
              socket.emit(
                "message-error",
                recipient || "Recipient does not exist",
              );
            }
          });
        }
      },
    );

    socket.on(
      "send-notification",
      async (data: {
        sender_id: string;
        type: string;
        message_id?: string;
        channel_id?: string;
        server_id?: string;
      }) => {
        if (!data.message_id && !data.channel_id) {
          const recipients = await getServerMembersExcept(
            data.server_id!,
            data.sender_id,
          );
          if (typeof recipients === "string") {
            socket.emit("no-recipients");
            return;
          }
          recipients.forEach(async (recipient) => {
            await createNotification({
              recipient_id: recipient.member_id,
              read_status: false,
              type: data.type,
              server_id: data.server_id!,
            });

            if (recipient.user!.socket_id) {
              socket.to(recipient.user!.socket_id).emit("client-refresh");
            }
          });
          return;
        }
      },
    );

    socket.on("create-note", (newNote) => {
      console.log("creating note");
      socket.broadcast.emit("create-note", newNote);
    });

    socket.on("update-note", async (updatedNote) => {
      console.log("updating note");

      // Broadcast the updated note to all clients except the sender
      socket.broadcast.emit("update-note", updatedNote);
    });

    socket.on("delete-note", (noteId) => {
      console.log("deleting note");
      socket.broadcast.emit("delete-note", noteId);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      //when user disconnects, return user's socket id to null
      findUserBySocket(socket.id).then((user) => {
        if (user && typeof user !== "string") {
          updateUser(user.id, { socket_id: null }).then((user) => {
            return;
          });
        }
      });
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
