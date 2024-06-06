"use server";

import { auth } from "@/auth";
import { removeFromBlocklist } from "@/prisma/services/userService";

export default async function unblockUser(block_id: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Something went wrong.");
  }

  await removeFromBlocklist((session as ExtendedSession).userId, block_id);
}
