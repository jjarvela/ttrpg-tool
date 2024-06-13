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
import { getGamePiece } from "./prisma/services/gameBoardService";

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

    socket.on("friend-request-event", async (recipient_id: string) => {
      const recipient = await getUserById(recipient_id, { socket_id: true });

      if (recipient.socket_id) {
        socket.to(recipient.socket_id).emit("client-refresh");
      }
    });

    // character management
    socket.on("join-character-server", (serverId) => {
      socket.join(serverId);
    });

    socket.on("leave-character-server", (serverId) => {
      socket.leave(serverId);
    });

    socket.on("new-character", (data) => {
      const { serverId, character } = data;
      io.to(serverId).emit("updateCharacters", character);
    });

    socket.on("delete-character", (serverId, characterId) => {
      io.to(serverId).emit("delete-character", characterId);
    });

    socket.on("edit-character", (serverId, characterId, editedCharacter) => {
      io.to(serverId).emit("edit-character", characterId, editedCharacter);
    });

    // notes management
    socket.on("join-note-server", (serverId) => {
      socket.join(serverId);
    });

    socket.on("create-note", (data) => {
      io.to(data.serverId).emit("create-note", data);
    });

    socket.on("update-note", (data) => {
      io.to(data.serverId).emit("update-note", data);
    });

    socket.on("delete-note", (data) => {
      io.to(data.serverId).emit("delete-note", data);
    });

    // game board management
    socket.on("join-board", (board_id: string) => {
      socket.join(board_id);
    });

    socket.on(
      "add-piece",
      async (data: { piece_id: string; board_id: string }) => {
        try {
          const piece = await getGamePiece(data.piece_id);
          socket.emit("add-piece", piece);
          socket.to(data.board_id).emit("add-piece", piece);
        } catch (e) {
          socket.to(data.board_id).emit("error", "Something went wrong.");
        }
      },
    );

    socket.on(
      "update-piece",
      async (data: { piece_id: string; board_id: string }) => {
        try {
          const piece = await getGamePiece(data.piece_id);
          socket.emit("update-piece", piece);
          socket.to(data.board_id).emit("update-piece", piece);
        } catch (e) {
          socket.to(data.board_id).emit("error", "Something went wrong.");
        }
      },
    );

    socket.on(
      "delete-piece",
      (data: { piece_id: string; board_id: string }) => {
        socket.emit("delete-piece", data.piece_id);
        socket.to(data.board_id).emit("delete-piece", data.piece_id);
      },
    );

    socket.on("board-deleted", (board_id: string) => {
      socket.to(board_id).emit("board-deleted");
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
