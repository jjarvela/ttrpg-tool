"use server";

import { auth } from "@/auth";
import { isFriend } from "@/prisma/services/friendService";
import { getUserMutualServers } from "@/prisma/services/serverService";
import { getUserById } from "@/prisma/services/userService";

export default async function getUserDetails(user_id: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Something went wrong.");
  }

  const user = await getUserById(user_id, {
    id: true,
    username: true,
    screen_name: true,
    profile_image: true,
    person_description: true,
    dm_permission: true,
  });

  const isSelf = (session as ExtendedSession).userId === user_id;
  const friends = await isFriend((session as ExtendedSession).userId, user_id);

  const mutualServers = await getUserMutualServers(
    (session as ExtendedSession).userId,
    user.id,
  );

  return {
    user: {
      user,
      isSelf,
      isFriend: friends,
      dm_permission: user.dm_permission,
    },
    mutualServers,
  };
}
