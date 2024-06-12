"use server";

import { updateServerMember } from "@/prisma/services/serverService";

export default async function changeServerMemberProfile(
  server_id: string,
  member_user_id: string,
  data: {
    nickname?: string | null;
    icon?: string | null;
    share_timezone?: boolean | null;
  },
) {
  const member = await updateServerMember(server_id, member_user_id, data);
  return member;
}
