import { io } from "socket.io-client";

export const socket = io();

//Message form
export function sendMessage(recipient_id: string) {
  socket.emit("send-message", recipient_id);
}

export function sendNotification(data: {
  type: string;
  message_id?: string;
  channel_id?: string;
  server_id?: string;
}) {
  socket.emit("send-notification", data);
}
