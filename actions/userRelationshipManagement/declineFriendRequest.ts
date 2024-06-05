"use server";

import { deleteRequest } from "@/prisma/services/friendService";

export default async function declineFriendRequest(request_id: number) {
  const request = await deleteRequest(request_id);
  return request;
}
