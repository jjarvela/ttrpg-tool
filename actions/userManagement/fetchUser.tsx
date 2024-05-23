"use server";

import { getUserById } from "@/prisma/services/userService";

export async function fetchUser(user_id: string) {
  await getUserById(user_id);
}
