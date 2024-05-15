"use server";

import { auth } from "@/auth";
import {
  deleteNotification,
  getUnreadForUserConversation,
} from "@/prisma/services/notificationService";

export default async function markRead(conversation_id: string) {
  try {
    const session = await auth();

    if (!session || !(session as ExtendedSession).userId)
      return "No active user";

    const notifications = await getUnreadForUserConversation(
      (session as ExtendedSession).userId,
      conversation_id,
    );

    if (typeof notifications === "string") return notifications;

    if (notifications.length < 1) return;

    notifications.forEach(async (notification) => {
      await deleteNotification(notification.id);
    });

    return;
  } catch (e) {
    return (e as Error).message;
  }
}
