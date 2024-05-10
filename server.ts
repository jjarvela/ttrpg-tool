import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import {
  findUserBySocket,
  getUserById,
  updateUser,
} from "./prisma/services/userService";

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
    console.log("connected");

    socket.on("send-user", (user_id: string) => {
      console.log("updating user");
      //when user has connected, add user's socket id to db (can be used to send events and check active status)
      updateUser(user_id, { socket_id: socket.id }).then((user) => {
        return;
      });
    });

    socket.on("send-message", async (recipient_id: string) => {
      console.log("sending message to " + recipient_id);
      const recipient = await getUserById(recipient_id, { socket_id: true });
      console.log(recipient);
      if (recipient && typeof recipient !== "string") {
        //if recipient has a socket_id set, send event to their socket
        recipient.socket_id &&
          socket.to(recipient.socket_id).emit("received-message");
      } else {
        //if recipient returned error, send error event to sender's client
        socket.emit("message-error", recipient || "Recipient does not exist");
      }
    });

    socket.on("create-note", (newNote) => {
      console.log("creating note");
      socket.broadcast.emit("create-note", newNote);
    });

    socket.on("update-note", (updatedNote) => {
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
