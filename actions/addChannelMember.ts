"use server";
import {
  getConversationByChannelId,
  addChannelConversationMember,
} from "@/prisma/services/conversationService";
import errorHandler from "../utils/errorHandler";

export default async function addChannelMember(
  users: string[],
  channelId: string,
) {
  const conversation = await errorHandler(getConversationByChannelId, [
    channelId,
  ]);
  if (conversation) {
    const conversationId = conversation.uid;

    return errorHandler(addChannelConversationMember, [conversationId, users]);
  } else return { error: "Something went wrong. Please try again." };
}
