"use server";

import {
  getServerMember,
  updateServerMember,
} from "@/prisma/services/serverService";
import deleteBlob from "../deleteBlob";

export default async function changeServerMemberProfile(
  server_id: string,
  member_user_id: string,
  data: {
    nickname?: string | null;
    icon?: string | null;
    share_timezone?: boolean | null;
  },
) {
  let filename = "";

  if (data.icon !== undefined) {
    const original = await getServerMember(server_id, member_user_id);
    filename = original.icon || "";
  }

  const member = await updateServerMember(server_id, member_user_id, data);

  if (filename) {
    await deleteBlob(filename);
  }

  return member;
}
