import { db } from "../db";

export async function createNotification(data: {
  recipient_id: string;
  type: string;
  read_status: boolean;
  message_id?: string;
  conversation_id?: string;
  channel_id?: string;
  server_id?: string;
}): Promise<Notif> {
  const notification = await db.notification.create({ data });

  return notification;
}

export async function getUnreadForUser(
  userId: string,
  select?: { [key: string]: boolean },
): Promise<Notif[]> {
  const notifications = await db.notification.findMany({
    where: { recipient_id: userId, read_status: false },
    select,
  });

  return notifications;
}

export async function getUnreadForUserForServer(
  userId: string,
  serverId: string,
  select?: { [key: string]: boolean },
): Promise<Notif[]> {
  const notifications = await db.notification.findMany({
    where: { recipient_id: userId, read_status: false, server_id: serverId },
    select,
  });

  return notifications;
}

export async function getUnreadForUserConversations(
  userId: string,
  select?: { [key: string]: boolean },
): Promise<Notif[]> {
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
}

export async function getUnreadForUserConversation(
  userId: string,
  conversationId: string,
  select?: { [key: string]: boolean },
): Promise<Notif[]> {
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

  return notifications;
}

export async function getUnreadForUserChannel(
  userId: string,
  channelId: string,
  select?: { [key: string]: boolean },
): Promise<Notif[]> {
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
}

export async function updateNotification(
  id: string,
  data: { read_status: boolean },
): Promise<Notif> {
  const updated = await db.notification.update({ where: { id }, data });

  return updated;
}

export async function deleteNotification(id: string): Promise<Notif> {
  const deleted = await db.notification.delete({ where: { id } });

  return deleted;
}
