import { getServerMember } from "@/prisma/services/serverService";

export default async function getServerAuth(
  server_id: string,
  user_id: string,
) {
  try {
    const memberInfo = await getServerMember(server_id, user_id);
    if (!memberInfo || typeof memberInfo === "string") return null;
    return memberInfo;
  } catch (e) {
    console.log((e as Error).message);
    return null;
  }
}
