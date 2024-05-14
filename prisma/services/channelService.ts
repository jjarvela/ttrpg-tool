import { db } from "../db";
import { createId } from "@paralleldrive/cuid2";

export const createServerChannel = async (
  server_id: string,
  channel_name: string,
  channel_type: string,
) => {
  try {
    const result = await db.channel.create({
      data: {
        server_id: server_id,
        channel_name: channel_name,
        channel_type: channel_type,
      },
    });
    return result;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getChannelByServerIdAndName = async (id: string, name: string) => {
  try {
    const channel = await db.channel.findFirst({
      where: { server_id: id, AND: { channel_name: name } },
    });
    return channel;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getChannels = async (server_id: string) => {
  try {
    const channels = await db.channel.findMany({
      where: { server_id: server_id },
    });
    return channels;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getChannelByChannelId = async (channelId: string) => {
  try {
    const channel = await db.channel.findFirst({
      where: { uid: channelId },
    });
    return channel;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getParticipantsOfChannel = async (channel_id: string) => {
  try {
    const participants = await db.conversation.findFirst({
      where: { channel_id: channel_id },
      select: {
        participants: {
          select: {
            participant_id: true,
          },
        },
      },
    });
    return participants;
  } catch (e) {
    return (e as Error).message;
  }
};
