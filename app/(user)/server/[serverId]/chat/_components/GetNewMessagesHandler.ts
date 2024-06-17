"use server";
import { getMessagesByChannelId } from "@/prisma/services/conversationService";
import { Message } from "@prisma/client";

export default async function handleGetNewMessages(channel_id: string) {
  try {
    const messages = await getMessagesByChannelId(channel_id);
    if (typeof messages === "string") {
      return [];
    }
    if (messages === null) {
      return [];
    }
    console.log("messages", messages);
    return messages.messages as Message[];
  } catch (error) {
    console.error("Error getting all notes:", error);
    throw new Error("Error getting all notes");
  }
}
