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

export const getConversationByUid = async (uid: string, messages?: boolean) => {
  try {
    const conversation = db.conversation.findUnique({
      where: { uid: uid },
      include: { messages: messages || false },
    });
    return conversation;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getConversationParticipants = async (uid: string) => {
  try {
    const conversation = await db.conversation.findUnique({
      where: { uid: uid },
    });
    if (!conversation) return [];
    const participants = await db.conversationParticipant.findMany({
      where: { conversation_id: conversation.id },
    });
    return participants;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getUserConversations = async (user_id: string) => {
  try {
    const idArray = await db.conversationParticipant.findMany({
      where: {
        participant_id: user_id,
      },
      select: { conversation_id: true },
    });
    const conversations = await db.conversation.findMany({
      where: {
        AND: [
          { id: { in: idArray.map((item) => item.conversation_id) } },
          { channel_id: null },
        ],
      },
      include: {
        participants: {
          select: {
            participant: {
              select: { id: true, username: true, screen_name: true },
            },
          },
        },
        messages: {
          orderBy: { created_at: "desc" },
          select: {
            created_at: true,
            message: true,
          },
          take: 1,
        },
      },
    });
    return conversations;
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
    const uid = createId();
    const conversation = await db.conversation.create({
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
            uid: uid,
            sender_id: userid1,
            message: message,
          },
        },
      },
    });
    const result = db.message.findUnique({ where: { uid } });
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

export const addChannelConversationMember = async (
  conversation_id: number,
  participants: string[],
) => {
  const participant_data = participants.map((member) => {
    return { conversation_id: conversation_id, participant_id: member };
  });
  try {
    const result = await db.conversationParticipant.createMany({
      data: participant_data,
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
        id: true,
        uid: true,
      },
    });
    return result;
  } catch (e) {
    return (e as Error).message;
  }
};
