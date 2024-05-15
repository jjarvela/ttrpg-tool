"use server";

import { getServerMembers } from "@/prisma/services/serverService";

export default async function getServerUsers(serverId: string) {
  try {
    const members = await getServerMembers(serverId);

    return members;
  } catch (e) {
    return (e as Error).message;
  }
}
