"use server";

import { auth } from "@/auth";
import {
  createFriendRequest,
  getFriendRequestByUsers,
} from "@/prisma/services/friendService";

export default async function sendFriendRequest(recipient_id: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Something went wrong.");
  }

  const existing = await getFriendRequestByUsers(
    (session as ExtendedSession).userId,
    recipient_id,
  );

  if (existing) {
    throw new Error(
      "A friend request between you and the selected user already exists.",
    );
  }

  const request = await createFriendRequest({
    requester_id: (session as ExtendedSession).userId,
    recipient_id,
  });
  return request;
}
