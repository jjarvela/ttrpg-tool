"use server";

import { deleteCharacterBase } from "@/prisma/services/characterService";

export default async function deleteCharacterFromUser(base_id: string) {
  const character = await deleteCharacterBase(base_id);
  return character;
}
