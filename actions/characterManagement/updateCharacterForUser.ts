"use server";

import { updateCharacterBase } from "@/prisma/services/characterService";

export default async function updateCharacterForUser(
  character_id: string,
  data: { name: string; description?: string; image?: string; notes?: string },
) {
  const character = await updateCharacterBase(character_id, data);
  return character;
}
