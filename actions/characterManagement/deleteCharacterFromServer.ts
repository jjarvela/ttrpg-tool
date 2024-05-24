"use server";

import { deleteServerCharacter } from "@/prisma/services/characterService";

export default async function deleteCharacterFromServer(character_id: string) {
  const character = await deleteServerCharacter(character_id);
  return character;
}
