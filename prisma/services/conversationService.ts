import { db } from "../db";

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
    });
    return conversation;
  } catch (e) {
    return (e as Error).message;
  }
};
