"use server";

import { auth } from "@/auth";
import { createNotification } from "@/prisma/services/notificationService";

export default async function markUnread(
  conversation_id: string,
  latest_id: string,
) {
  try {
    const session = await auth();

    if (!session || !(session as ExtendedSession).userId)
      return "No active user";

    const newNotification = await createNotification({
      recipient_id: (session as ExtendedSession).userId,
      type: "chat-message",
      read_status: false,
      message_id: latest_id,
      conversation_id: conversation_id,
    });

    if (typeof newNotification === "string") return newNotification;

    return;
  } catch (e) {
    return (e as Error).message;
  }
}
