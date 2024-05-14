"use server";
import {
  getConversationByChannelId,
  createMessage,
} from "@/prisma/services/conversationService";

export default async function addChatMessage(ids: any, formData: FormData) {
  const message = formData.get("message") as string;
  const senderId = ids[0];
  const channelId = ids[1];
  const conversation = await getConversationByChannelId(channelId);
  if (conversation && typeof conversation !== "string") {
    const conversationId = conversation.uid;

    return createMessage(senderId, conversationId, message);
  } else return "Something went wrong. Please try again.";
}
