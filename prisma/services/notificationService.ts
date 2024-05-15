import { db } from "../db";

export async function createNotification(data: {
  recipient_id: string;
  type: string;
  read_status: boolean;
  message_id?: string;
  conversation_id?: string;
  channel_id?: string;
  server_id?: string;
}) {
  try {
    const notification = await db.notification.create({ data });
    return notification;
  } catch (e) {
    return (e as Error).message;
  }
}

export async function getUnreadForUser(
  userId: string,
  select?: { [key: string]: boolean },
) {
  try {
    const notifications = await db.notification.findMany({
      where: { recipient_id: userId, read_status: false },
      select,
    });
    return notifications;
  } catch (e) {
    return (e as Error).message;
  }
}

export async function getUnreadForUserForServer(
  userId: string,
  serverId: string,
  select?: { [key: string]: boolean },
) {
  try {
    const notifications = await db.notification.findMany({
      where: { recipient_id: userId, read_status: false, server_id: serverId },
      select,
    });
    return notifications;
  } catch (e) {
    return (e as Error).message;
  }
}

export async function getUnreadForUserConversations(
  userId: string,
  select?: { [key: string]: boolean },
) {
  try {
    const notifications = await db.notification.findMany({
      where: {
        recipient_id: userId,
        read_status: false,
        conversation_id: { not: null },
        channel_id: null,
      },
      select,
    });
    return notifications;
  } catch (e) {
    return (e as Error).message;
  }
}

export async function getUnreadForUserConversation(
  userId: string,
  conversationId: string,
  select?: { [key: string]: boolean },
) {
  try {
    const notifications = await db.notification.findMany({
      where: {
        recipient_id: userId,
        read_status: false,
        conversation_id: conversationId,
        channel_id: null,
      },
      orderBy: {
        created_at: "asc",
      },
      select,
    });
    console.log(notifications);
    return notifications;
  } catch (e) {
    return (e as Error).message;
  }
}

export async function getUnreadForUserChannel(
  userId: string,
  channelId: string,
  select?: { [key: string]: boolean },
) {
  try {
    const notifications = await db.notification.findMany({
      where: {
        recipient_id: userId,
        read_status: false,
        channel_id: channelId,
      },
      orderBy: {
        created_at: "asc",
      },
      select,
    });
    return notifications;
  } catch (e) {
    return (e as Error).message;
  }
}

export async function updateNotification(
  id: string,
  data: { read_status: boolean },
) {
  try {
    const updated = await db.notification.update({ where: { id }, data });
    return updated;
  } catch (e) {
    return (e as Error).message;
  }
}

export async function deleteNotification(id: string) {
  try {
    const deleted = await db.notification.delete({ where: { id } });
    return deleted;
  } catch (e) {
    return (e as Error).message;
  }
}
