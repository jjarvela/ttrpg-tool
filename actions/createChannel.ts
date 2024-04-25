"use server";

import { auth } from "../auth";
import { createServerChannel } from "@/prisma/services/channelService";
import { createChannelConversation } from "@/prisma/services/conversationService";

type ChannelData = {
  users: string[];
  channelName: string;
  channelType: string;
};

export default async function createChannel(
  server_id: string,
  formData: FormData,
) {
  const session = await auth();
  const data = {
    users: formData.get("users"),
    channelName: formData.get("name"),
    channelType: formData.get("type"),
  };

  const userId = (session as ExtendedSession).userId;
  try {
    // const newChannel = await createServerChannel(
    //   server_id,
    //   data.channelName,
    //   data.channelType,
    // );
    // if (typeof newChannel !== "string") {
    //   return createChannelConversation(newChannel.uid, data.users);
    // }
  } catch (e) {
    return (e as Error).message;
  }
}
