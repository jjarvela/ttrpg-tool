"use server";

import {
  addUserFriend,
  deleteRequest,
  getRequestById,
} from "@/prisma/services/friendService";

export default async function acceptFriendRequest(request_id: number) {
  const request = await getRequestById(request_id);

  const friends = await addUserFriend(
    request.requester_id,
    request.recipient_id,
  );

  await deleteRequest(request_id);

  return friends;
}
