"use server";

import { auth } from "@/auth";
import { addToBlocklist } from "@/prisma/services/userService";

export default async function blockUser(block_id: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Something went wrong.");
  }

  await addToBlocklist((session as ExtendedSession).userId, block_id);
}
