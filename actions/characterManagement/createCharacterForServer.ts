"use server";

import { createServerCharacter } from "@/prisma/services/characterService";

export async function createCharacterForServer(
  base_id: string,
  server_id: string,
  data: {
    class: string;
    level: number;
    experience: number;
    experience_max: number;
    vitals: number[];
    vitals_max: number[];
    attributes: number[];
    statics: number[];
    skills: string;
    items: string;
  },
) {
  const character = await createServerCharacter(base_id, server_id, data);
  return character;
}
