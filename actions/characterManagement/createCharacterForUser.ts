"use server";

import { createCharacterBase } from "@/prisma/services/characterService";

export default async function createCharacterForUser(
  user_id: string,
  data: { name: string; description?: string; image?: string; notes?: string },
) {
  console.log("server action");
  const character = await createCharacterBase(user_id, data);
  return character;
}
