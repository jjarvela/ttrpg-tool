import { db } from "../db";

export async function createNotification(data: {
  recipient_id: string;
  type: string;
  read_status: boolean;
  message_id?: string;
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

export async function updateNotification(
  id: number,
  data: { read_status: boolean },
) {
  try {
    const updated = await db.notification.update({ where: { id }, data });
    return updated;
  } catch (e) {
    return (e as Error).message;
  }
}

export async function deleteNotification(id: number) {
  try {
    const deleted = await db.notification.delete({ where: { id } });
    return deleted;
  } catch (e) {
    return (e as Error).message;
  }
}
