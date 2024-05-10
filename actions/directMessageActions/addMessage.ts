"use server";
import {
  getConversationByParticipants,
  createConversationWithMessage,
  createMessage,
} from "../../prisma/services/conversationService";

export default async function addMessage(
  userIds: string[],
  formData: FormData,
) {
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
    const result = await createConversationWithMessage(
      senderId,
      receiverId,
      message,
    );
    if (!result) return "No message";
    return result;
  } else return "Something went wrong. Please try again.";
}
