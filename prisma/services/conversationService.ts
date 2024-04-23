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

export const getMessages = async (conversation_uid: string) => {
  try {
    const result = await db.message.findMany({
      where: {
        conversation_uid: conversation_uid,
      },
      select: {
        uid: true,
        sender_id: true,
        message: true,
        created_at: true,
      },
      orderBy: {
        created_at: "asc",
      },
    });
    return result;
  } catch (e) {
    return (e as Error).message;
  }
};

export const createChannelConversation = async (
  channel_id: string,
  members: string[],
) => {
  const participant_ids = members.map((member) => {
    return { participant_id: member };
  });
  try {
    const result = await db.conversation.create({
      data: {
        uid: createId(),
        channel_id: channel_id,
        participants: {
          create: participant_ids,
        },
      },
    });
    return result;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getMessagesByChannelId = async (channel_id: string) => {
  try {
    const result = await db.conversation.findFirst({
      where: {
        channel_id: channel_id,
      },
      select: {
        messages: {
          select: {
            uid: true,
            sender_id: true,
            message: true,
            created_at: true,
          },
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });
    return result;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getConversationByChannelId = async (channel_id: string) => {
  try {
    const result = await db.conversation.findFirst({
      where: {
        channel_id: channel_id,
      },
      select: {
        uid: true,
      },
    });
    return result;
  } catch (e) {
    return (e as Error).message;
  }
};
