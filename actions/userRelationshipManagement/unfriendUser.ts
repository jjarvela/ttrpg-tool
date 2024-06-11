"use server";

import { auth } from "@/auth";
import { removeUserFriend } from "@/prisma/services/friendService";

export default async function unfriendUser(target_id: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Something went wrong.");
  }

  const friends = await removeUserFriend(
    (session as ExtendedSession).userId,
    target_id,
  );

  return friends;
}
