import db from "../db";

export const getConversationByParticipants = async (
  userid1: string,
  userid2: string,
) => {
  const conversation = await db.conversation.findFirst({
    where: {
      channel_id: null,
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
};

export const getConversationByUid = async (
  uid: string,
  messages?: boolean,
  channel?: boolean,
) => {
  const conversation = db.conversation.findUnique({
    where: { uid: uid },
    include: { messages: messages || false, channel: channel || false },
  });
  return conversation;
};

export const getConversationParticipants = async (uid: string) => {
  const conversation = await db.conversation.findUnique({
    where: { uid: uid },
  });
  if (!conversation) return [];
  const participants = await db.conversationParticipant.findMany({
    where: { conversation_id: conversation.uid },
  });
  return participants;
};

export const deleteConversationParticipant = async (
  conversation_id: string,
  user_id: string,
) => {
  const conversation = await db.conversation.findUnique({
    where: { uid: conversation_id },
  });
  if (!conversation) return "No conversation";

  const participant = await db.conversationParticipant.findFirst({
    where: { conversation_id: conversation.uid, participant_id: user_id },
  });

  if (!participant) return "No participant";

  await db.conversationParticipant.delete({ where: { id: participant.id } });
};

export const getUserConversations = async (user_id: string) => {
  const idArray = await db.conversationParticipant.findMany({
    where: {
      participant_id: user_id,
    },
    select: { conversation_id: true },
  });
  const conversations = await db.conversation.findMany({
    where: {
      AND: [
        { uid: { in: idArray.map((item) => item.conversation_id) } },
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
          uid: true,
          created_at: true,
          message: true,
        },
        take: 1,
      },
    },
  });
  return conversations;
};

export const createConversationWithMessage = async (
  userid1: string,
  userid2: string,
  message: string,
) => {
  const conversation = await db.conversation.create({
    data: {
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
          sender_id: userid1,
          message: message,
        },
      },
    },
  });
  const messages = await db.conversation.findUnique({
    where: { uid: conversation.uid },
    select: { messages: true },
  });
  return messages?.messages[0];
};

export const createMessage = async (
  sender_id: string,
  conversation_uid: string,
  message: string,
) => {
  const result = await db.message.create({
    data: {
      conversation_uid: conversation_uid,
      sender_id: sender_id,
      message: message,
    },
  });
  return result;
};

export const getMessages = async (conversation_uid: string) => {
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
};

export const createChannelConversation = async (
  channel_id: string,
  members: string[],
) => {
  const participant_ids = members.map((member) => {
    return { participant_id: member };
  });
  const result = await db.conversation.create({
    data: {
      channel_id: channel_id,
      participants: {
        create: participant_ids,
      },
    },
  });
  return result;
};

export const addChannelConversationMember = async (
  conversation_id: string,
  participants: string[],
) => {
  const participant_data = participants.map((member) => {
    return { conversation_id: conversation_id, participant_id: member };
  });
  const result = await db.conversationParticipant.createMany({
    data: participant_data,
  });
  return result;
};

export const getMessagesByChannelId = async (channel_id: string) => {
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
};

export const getConversationByChannelId = async (channel_id: string) => {
  const result = await db.conversation.findFirst({
    where: {
      channel_id: channel_id,
    },
    select: {
      uid: true,
    },
  });
  return result;
};
