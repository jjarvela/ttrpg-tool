import { io } from "socket.io-client";

export const socket = io();

//Message form
/**
 * This function will send for a server-side event that handles the delivery of a message notification to all conversation participants aside from sending user.
 * @param user_id ID of the user sending the message
 * @param message_id ID of the message being sent
 * @param conversation_id ID of the conversation
 */
export function sendMessage(
  user_id: string,
  message_id: string,
  conversation_id: string,
): void {
  socket.emit("send-message", { user_id, message_id, conversation_id });
}

export function sendNotification(data: {
  type: string;
  message_id?: string;
  channel_id?: string;
  server_id?: string;
}): void {
  socket.emit("send-notification", data);
}

export function friendRequestEvent(recipient_id: string) {
  socket.emit("friend-request-event", recipient_id);
}

export function serverUpdateEvent(server_id: string) {
  socket.emit("server-update-event", server_id);
}
