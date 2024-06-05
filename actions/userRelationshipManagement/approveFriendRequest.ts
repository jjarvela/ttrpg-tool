"use server";

import { addUserFriend, getRequestById } from "@/prisma/services/friendService";

export default async function approveFriendRequest(request_id: number) {
  const request = await getRequestById(request_id);

  const friends = await addUserFriend(
    request.requester_id,
    request.recipient_id,
  );

  return friends;
}
