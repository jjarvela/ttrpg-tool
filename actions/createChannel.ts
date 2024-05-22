"use server";

import { auth } from "../auth";
import {
  createServerChannel,
  getChannelByServerIdAndName,
} from "@/prisma/services/channelService";
import { createChannelConversation } from "@/prisma/services/conversationService";

export default async function createChannel(
  server_id: string,
  formData: FormData,
  users: string[],
) {
  const session = await auth();
  const data = {
    users: users,
    channelName: formData.get("name") as string,
    channelType: formData.get("channeltypes") as string,
  };

  try {
    await getChannelByServerIdAndName(server_id, data.channelName);

    return "There is already a channel with that name.";
  } catch (e) {
    if ((e as Error).message !== "No channel could be found") {
      return "Something went wrong. Please try again.";
    }
  }

  try {
    const newChannel = await createServerChannel(
      server_id,
      data.channelName,
      data.channelType,
    );
    if (typeof newChannel === "string") {
      return "Something went wrong. Please try again.";
    }
    if (typeof newChannel !== "string") {
      return createChannelConversation(newChannel.uid, data.users);
    }
  } catch (e) {
    return (e as Error).message;
  }
}
