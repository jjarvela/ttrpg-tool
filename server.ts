import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { findUserBySocket, updateUser } from "./prisma/services/userService";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connect", (socket) => {
    socket.emit("add-user");

    socket.on("send-user", (user_id: string) => {
      //when user has connected, add user's socket id to db (can be used to send events and check active status)
      updateUser(user_id, { socket_id: socket.id }).then((user) => {
        console.log(user);
        return;
      });
    });
    socket.on("disconnect", () => {
      //when user disconnects, return user's socket id to null
      findUserBySocket(socket.id).then((user) => {
        if (user && typeof user !== "string") {
          updateUser(user.id, { socket_id: null }).then((user) => {
            console.log(user);
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
