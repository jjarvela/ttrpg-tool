import { db } from "../db";

export const createCharacterBase = async (
  owner_id: string,
  data: { name: string; description?: string; image?: string },
): Promise<{
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  image: string | null;
}> => {
  const character = await db.characterBase.create({
    data: {
      ...data,
      owner_id,
    },
  });
  return character;
};

export const createServerCharacterConfig = async (
  server_id: string,
  data: {
    vitals_count: number;
    vitals_names: string[];
    attributes_count: number;
    attributes_names: string[];
    statics_count: number;
    statics_names: string[];
  },
): Promise<{
  id: number;
  server_id: string;
  vitals_count: number;
  vitals_names: string[];
  attributes_count: number;
  attributes_names: string[];
  statics_count: number;
  statics_names: string[];
}> => {
  const charaConfig = await db.serverCharacterConfig.create({
    data: {
      ...data,
      server_id,
    },
  });
  return charaConfig;
};

export const createServerCharacter = async (
  base_id: string,
  server_id: string,
  data: {
    class: string;
    level: number;
    vitals: number[];
    attributes: number[];
    statics: number[];
    skills: string;
    items: string;
  },
): Promise<{
  id: number;
  base_id: string;
  server_id: string;
  class: string;
  level: number;
  vitals: number[];
  attributes: number[];
  statics: number[];
  skills: string;
  items: string;
}> => {
  const character = await db.serverCharacter.create({
    data: {
      ...data,
      base_id,
      server_id,
    },
  });
  return character;
};

export const getCharacterBase = async (
  base_id: string,
  select: {
    select: { [key: string]: boolean };
    owner?: { [key: string]: boolean };
    server_stats?: { [key: string]: boolean };
  },
) => {
  const character = await db.characterBase.findUnique({
    where: { id: base_id },
    select: {
      ...select.select,
      owner: select.owner,
      server_stats: select.server_stats,
    },
  });
  return character;
};

export const getUserCharacterBases = async (
  user_id: string,
  select: {
    select: { [key: string]: boolean };
    owner?: { [key: string]: boolean };
    server_stats?: { [key: string]: boolean };
  },
) => {};

export const getServerCharacterConfig = async () => {};

export const getServerCharacter = async () => {};

export const getServerCharacters = async () => {};

export const updateCharacterBase = async () => {};

export const updateServerCharacterConfig = async () => {};

export const updateServerCharacter = async () => {};

export const deleteCharacterBase = async () => {};

export const deleteServerCharacterConfig = async () => {};

export const deleteServerCharacter = async () => {};
