"use server";

import {
  getCharacterBase,
  updateCharacterBase,
} from "@/prisma/services/characterService";
import deleteBlob from "../deleteBlob";

export default async function updateCharacterForUser(
  character_id: string,
  data: { name: string; description?: string; image?: string; notes?: string },
) {
  let filename = "";

  if (data.image) {
    const original = await getCharacterBase(character_id);
    filename = original.image || "";
  }

  const character = await updateCharacterBase(character_id, data);

  if (filename !== "") {
    await deleteBlob(filename);
  }

  return character;
}
