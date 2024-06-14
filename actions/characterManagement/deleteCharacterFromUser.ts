"use server";

import { deleteCharacterBase } from "@/prisma/services/characterService";
import deleteBlob from "../deleteBlob";

export default async function deleteCharacterFromUser(base_id: string) {
  const character = await deleteCharacterBase(base_id);

  if (character.image) {
    await deleteBlob(character.image);
  }

  return character;
}
