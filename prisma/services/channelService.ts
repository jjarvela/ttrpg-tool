import { db } from "../db";

export const createServerChannel = async (
  server_id: string,
  channel_name: string,
  channel_type: string,
) => {
  const result = await db.channel.create({
    data: {
      server_id: server_id,
      channel_name: channel_name,
      channel_type: channel_type,
    },
  });
  return result;
};

export const getChannelByServerIdAndName = async (id: string, name: string) => {
  const channel = await db.channel.findFirst({
    where: { server_id: id, AND: { channel_name: name } },
  });

  if (!channel) throw new Error("No channel could be found");
  return channel;
};

export const getChannels = async (server_id: string) => {
  const channels = await db.channel.findMany({
    where: { server_id: server_id },
  });
  return channels;
};

export const getChannelByChannelId = async (channelId: string) => {
  const channel = await db.channel.findFirst({
    where: { uid: channelId },
  });

  if (!channel) throw new Error("No channel could be found");
  return channel;
};

export const getParticipantsOfChannel = async (channel_id: string) => {
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
};
