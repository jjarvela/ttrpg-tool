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
        uid: createId(),
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

export const getChannelData = async (channel_id: string) => {
  try {
    const channel = await db.channel.findUnique({
      where: { uid: channel_id },
    });
    return channel;
  } catch (e) {
    return (e as Error).message;
  }
};
