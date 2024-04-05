import { db } from "../db";
import { createId } from "@paralleldrive/cuid2";

export const getConversationByParticipants = async (
  userid1: string,
  userid2: string,
) => {
  try {
    const conversation = await db.conversation.findFirst({
      where: {
        participants: {
          every: {
            participant_id: { in: [userid1, userid2] },
          },
        },
      },
      select: {
        uid: true,
      },
    });
    return conversation;
  } catch (e) {
    return (e as Error).message;
  }
};

export const createConversationWithMessage = async (
  userid1: string,
  userid2: string,
  message: string,
) => {
  try {
    const result = await db.conversation.create({
      data: {
        uid: createId(),
        participants: {
          create: [
            {
              participant_id: userid1,
            },
            {
              participant_id: userid2,
            },
          ],
        },
        messages: {
          create: {
            uid: createId(),
            sender_id: userid1,
            message: message,
          },
        },
      },
    });
    return result;
  } catch (e) {
    return (e as Error).message;
  }
};

export const createMessage = async (
  sender_id: string,
  conversation_uid: string,
  message: string,
) => {
  try {
    const result = await db.message.create({
      data: {
        uid: createId(),
        conversation_uid: conversation_uid,
        sender_id: sender_id,
        message: message,
      },
    });
    return result;
  } catch (e) {
    return (e as Error).message;
  }
};
