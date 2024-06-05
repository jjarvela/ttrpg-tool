"use server";

import { createFriendRequest } from "@/prisma/services/friendService";

export default async function sendFriendRequest(
  requester_id: string,
  recipient_id: string,
) {
  const request = await createFriendRequest({ requester_id, recipient_id });
  return request;
}
