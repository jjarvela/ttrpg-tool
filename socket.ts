import { io } from "socket.io-client";

export const socket = io();

//Message form
export function sendMessage(
  user_id: string,
  message_id: string,
  conversation_id: string,
) {
  socket.emit("send-message", { user_id, message_id, conversation_id });
}

export function sendNotification(data: {
  type: string;
  message_id?: string;
  channel_id?: string;
  server_id?: string;
}) {
  socket.emit("send-notification", data);
}
