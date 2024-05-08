"use server";
import {
  getConversationByChannelId,
  addChannelConversationMember,
} from "@/prisma/services/conversationService";

export default async function addChannelMember(
  formData: FormData,
  users: string[],
  channelId: string,
) {
  const conversation = await getConversationByChannelId(channelId);
  if (conversation && typeof conversation !== "string") {
    const conversationId = conversation.id;

    return addChannelConversationMember(conversationId, users);
  } else return { error: "Something went wrong. Please try again." };
}
