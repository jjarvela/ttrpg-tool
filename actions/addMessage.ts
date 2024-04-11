"use server";
import {
  getConversationByParticipants,
  createConversationWithMessage,
  createMessage,
} from "../prisma/services/conversationService";
import { revalidatePath } from "next/cache";

export default async function addMessage(userIds: any, formData: FormData) {
  const message = formData.get("message") as string;
  const senderId = userIds[0];
  const receiverId = userIds[1];
  const conversation = await getConversationByParticipants(
    senderId,
    receiverId,
  );

  if (conversation && typeof conversation !== "string") {
    return createMessage(senderId, conversation.uid, message);
  } else if (!conversation) {
    return createConversationWithMessage(senderId, receiverId, message);
  } else return { error: "Something went wrong. Please try again." };
}
