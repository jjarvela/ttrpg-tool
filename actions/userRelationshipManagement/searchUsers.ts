"use server";

import { auth } from "@/auth";
import { isFriend } from "@/prisma/services/friendService";
import { searchUsers } from "@/prisma/services/userService";

export default async function searchForUsers(search_term: string) {
  const session = await auth();

  if (!session) throw new Error("Something went wrong");

  const users = await searchUsers(search_term);

  //filter out any users that have the searched blocked
  const filtered = users.filter(
    (user) => user.blocklist.indexOf((session as ExtendedSession).userId) < 0,
  );

  const result = await Promise.all(
    filtered.map(async (user) => {
      const friends = await isFriend(
        user.id,
        (session as ExtendedSession).userId,
      );

      return {
        id: user.id,
        username: user.username,
        screen_name: user.screen_name,
        profile_image: user.profile_image,
        isFriend: friends,
      };
    }),
  );

  return result;
}
