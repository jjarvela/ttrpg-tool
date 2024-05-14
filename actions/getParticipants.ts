"use server";

import { getParticipantsOfChannel } from "@/prisma/services/channelService";

export default async function getParticipants(channelId: string) {
  const receivers = await getParticipantsOfChannel(channelId);

  return receivers;
}
