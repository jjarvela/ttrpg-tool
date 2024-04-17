import { io } from "socket.io-client";

export const socket = io();

//Message form
export function sendMessage(recipient_id: string) {
  socket.emit("send-message", recipient_id);
}
