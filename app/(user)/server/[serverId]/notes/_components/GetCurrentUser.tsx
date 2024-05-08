"use server";
import { auth } from "@/auth";
import { getUserById } from "@/prisma/services/userService";

export async function getCurrentUser() {
  const session = await auth();

  if (!session) return null;

  const user = await getUserById((session as ExtendedSession).userId);

  if (!user || typeof user === "string") return null;

  return { username: user.username };
}
