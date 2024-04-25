"use server";

import {
  deleteServerData,
  deleteServerMember,
  getServerMember,
  getServerMembers,
  updateServerMember,
} from "@/prisma/services/serverService";

export default async function leaveServer(user_id: string, server_id: string) {
  const serverMembers = await getServerMembers(server_id);

  if (!serverMembers || typeof serverMembers === "string")
    return "An unexpected error occurred";

  //if only one server member left, delete entire server
  if (serverMembers.length === 1) {
    try {
      const deletedServer = await deleteServerData(server_id);
      return deletedServer;
    } catch (e) {
      return (e as Error).message;
    }
  }
  const serverMember = await getServerMember(server_id, user_id);

  if (!serverMember) return "No member data could be found";

  if (typeof serverMember === "string") return serverMember;

  //if leaving member is admin, give admin role to a remaining member
  if (serverMember.role === "admin") {
    const newAdmin = serverMembers.filter(
      (member) => member.member_id !== user_id,
    )[0];
    const updatedAdmin = await updateServerMember(
      server_id,
      newAdmin.member_id,
      { role: "admin" },
    );
    if (typeof updatedAdmin === "string") {
      return "An unexpected error occurred.";
    }
  }

  try {
    const deletedMember = await deleteServerMember(server_id, user_id);
    return deletedMember;
  } catch (e) {
    return (e as Error).message;
  }
}
