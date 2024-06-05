"use server";

import { auth } from "@/auth";
import { isFriend } from "@/prisma/services/friendService";
import { getUserById, searchUsers } from "@/prisma/services/userService";

export default async function searchForUsers(search_term: string) {
  const session = await auth();

  if (!session) throw new Error("Something went wrong");

  const user = await getUserById((session as ExtendedSession).userId, {
    blocklist: true,
  });

  const users = await searchUsers(search_term);

  //filter out any users that have the searched blocked, or that the searcher has blocked
  const filtered = users.filter(
    (target) =>
      target.blocklist.indexOf(user.id) < 0 &&
      user.blocklist.indexOf(target.id) < 0,
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
