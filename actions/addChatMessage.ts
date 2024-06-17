"use server";
import {
  getConversationByChannelId,
  createMessage,
} from "@/prisma/services/conversationService";

export default async function addChatMessage(ids: string[], formData: FormData | string) {

  let message = '';
  if (typeof formData === "string") {
    message = formData as string
  } else {
    message = formData.get("message") as string

  }
  const senderId = ids[0];
  const channelId = ids[1];
  const conversation = await getConversationByChannelId(channelId);
  if (conversation && typeof conversation !== "string") {
    const conversationId = conversation.uid;

    return createMessage(senderId, conversationId, message);
  } else return "Something went wrong. Please try again.";
}
