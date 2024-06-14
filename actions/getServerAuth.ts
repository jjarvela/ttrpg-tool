import { getServerMember } from "@/prisma/services/serverService";

export default async function getServerAuth(
  server_id: string,
  user_id: string,
) {
  try {
    const memberInfo = await getServerMember(server_id, user_id);

    return memberInfo;
  } catch (e) {
    console.error((e as Error).message);

    return null;
  }
}
