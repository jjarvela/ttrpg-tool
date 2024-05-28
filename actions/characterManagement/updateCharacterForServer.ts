"use server";

import { updateServerCharacter } from "@/prisma/services/characterService";

export default async function updateCharacterForServer(
  character_id: string,
  data: {
    class?: string;
    level?: number;
    vitals?: number[];
    attributes?: number[];
    skills?: string;
    items?: string;
  },
) {
  const character = await updateServerCharacter(character_id, data);
  return character;
}
