import { db } from "../db";

/**
 * Create a user-bound character bases
 * @param owner_id string - id of the user who owns the character
 * @param data {name: string, description?: string, image?: string}
 * @returns The newly created character - {id: string, owner_id: string, name: string, description: string | null, image: string | null}
 */
export const createCharacterBase = async (
  owner_id: string,
  data: { name: string; description?: string; image?: string },
): Promise<CharacterBase> => {
  const character = await db.characterBase.create({
    data: {
      ...data,
      owner_id,
    },
  });

  return character;
};

/**
 * Create a server-specific character configuration. Only one can exist per server.
 * The configuration is separated into three different status sets:
 * vitals - hitpoints and the like
 * attributes - malluable character attributes, eg. strength, dexterity...
 * statics - character attributes that don't change upon leveling up
 * @param server_id string - id of the server this configuration is for
 * @param data {vitals_count: number, vitals_names: string[], attributes_count: number, attributes_names: string[], statics_count: number, statics_names: string[]}
 * @returns server character config - {id: number, server_id: string, vitals_count: number, vitals_names: string[], attributes_count: number, attributes_names: string[], statics_count: number, statics_names: string[]}
 */
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
): Promise<CharacterConfig> => {
  const charaConfig = await db.serverCharacterConfig.create({
    data: {
      ...data,
      server_id,
    },
  });

  return charaConfig;
};

/**
 * Create a server-bound character profile from a character base and server character config
 * The base id and server id have a unique restriction so that one character base can appear on a server only once
 * The vitals, attributes and statistics array lengths must match the corresponding counts set by the server's character configuration
 * @param base_id string - the id of the character base
 * @param server_id string - the id of the server
 * @param data {class: string, level: number, vitals: number[], attributes: number[], statics: number[], skills: string, items: string;}
 * @returns server character - {id: string, base_id: string, server_id: string, class: string, level: number, experience: number, vitals: number[], attributes: number[], statics: number[], skills: string, items: string;}
 */
export const createServerCharacter = async (
  base_id: string,
  server_id: string,
  data: {
    class: string;
    level: number;
    experience: number;
    vitals: number[];
    attributes: number[];
    statics: number[];
    skills: string;
    items: string;
  },
): Promise<Omit<ServerCharacter, "base">> => {
  const config = await db.serverCharacterConfig.findUnique({
    where: { server_id: server_id },
    select: { vitals_count: true, attributes_count: true, statics_count: true },
  });

  if (!config) {
    throw new Error("The server has no character configuration");
  }

  if (data.vitals.length !== config.vitals_count) {
    throw new Error("The provided vitals don't match the amount configured");
  }

  if (data.attributes.length !== config.attributes_count) {
    throw new Error(
      "The provided attributes don't match the amount configured",
    );
  }

  if (data.statics.length !== config.statics_count) {
    throw new Error("The provided statics don't match the amount configured");
  }

  const character = await db.serverCharacter.create({
    data: {
      ...data,
      base_id,
      server_id,
    },
  });

  return character;
};

/**
 * Get a single character base by id
 * @param base_id string
 * @param select optional property to set which properties should be included - {
    select: { [key: string]: boolean };
    owner?: { [key: string]: boolean };
    server_stats?: { [key: string]: boolean };
  }
 * @returns character base with either the base properties, or custom selection of properties
   {
    id: string;
    owner_id: string;
    name: string;
    description: string | null;
    image: string | null;
}
to include owner and server_stats, please specify them and the wanted properties in select object
 */
export const getCharacterBase = async (
  base_id: string,
  select?: {
    select: { [key: string]: boolean };
    owner?: { [key: string]: boolean };
    server_stats?: { [key: string]: boolean };
  },
) => {
  if (select?.select) {
    const character = await db.characterBase.findUnique({
      where: { id: base_id },
      select: {
        ...select?.select,
        owner: select.owner ? { select: { ...select?.owner } } : false,
        server_stats: select.server_stats
          ? { select: { ...select?.server_stats } }
          : false,
      },
    });

    if (!character) throw new Error("Character not found.");

    return character;
  }

  const character = await db.characterBase.findUnique({
    where: { id: base_id },
    include: {
      owner: select?.owner ? { select: { ...select?.owner } } : false,
      server_stats: select?.server_stats
        ? { select: { ...select?.server_stats } }
        : false,
    },
  });

  if (!character) throw new Error("Character not found.");

  return character;
};

/**
 * Get specified user's character bases
 * @param user_id string
 * @param select optional, to set which properties should be included - {
    select: { [key: string]: boolean };
    owner?: { [key: string]: boolean };
    server_stats?: { [key: string]: boolean };
  }
 * @returns character base array with either the base properties, or custom selection of properties
   {
    id: string;
    owner_id: string;
    name: string;
    description: string | null;
    image: string | null;
}[]
to include owner and server_stats, please specify them and the wanted properties in select object
 */
export const getUserCharacterBases = async (
  user_id: string,
  select?: {
    select: { [key: string]: boolean };
    owner?: { [key: string]: boolean };
    server_stats?: { [key: string]: boolean };
  },
) => {
  if (select?.select) {
    const characters = await db.characterBase.findMany({
      where: { owner_id: user_id },
      select: {
        ...select?.select,
        owner: select.owner ? { select: { ...select?.owner } } : false,
        server_stats: select.server_stats
          ? { select: { ...select?.server_stats } }
          : false,
      },
    });

    return characters;
  }

  const characters = await db.characterBase.findMany({
    where: { owner_id: user_id },
    include: {
      owner: select?.owner ? { select: { ...select?.owner } } : false,
      server_stats: select?.server_stats
        ? { select: { ...select?.server_stats } }
        : false,
    },
  });

  return characters;
};

/**
 * Get specified server's character configuration properties
 * @param server_id string
 * @param select optional, to set which properties should be included - { [key: string]: boolean }
 * @returns server character config object with either all properties, or custom selection of properties
 * {
    id: number;
    server_id: string;
    vitals_count: number;
    vitals_names: string[];
    attributes_count: number;
    attributes_names: string[];
    statics_count: number;
    statics_names: string[];
}
 */
export const getServerCharacterConfig = async (
  server_id: string,
  select?: { [key: string]: boolean },
) => {
  const config = await db.serverCharacterConfig.findUnique({
    where: { server_id: server_id },
    select,
  });

  if (!config) throw new Error("No character configuration found for server");

  return config;
};

/**
 * Get specified server character
 * @param id server character id - string
 * @param select  optional, to set which properties should be included - {
    select: { [key: string]: boolean };
    base?: { [key: string]: boolean };
 * @returns server character with either original properties or custom properties
    to include character base properties, please use the base property of the select object
 */
export const getServerCharacter = async (
  id: string,
  select?: {
    select: { [key: string]: boolean };
    base?: { [key: string]: boolean };
  },
) => {
  if (select?.select) {
    const character = await db.serverCharacter.findUnique({
      where: { id: id },
      select: {
        ...select?.select,
        base: select.base ? { select: { ...select?.base } } : false,
      },
    });

    if (!character) throw new Error("Character could not be found");

    return character;
  }

  const character = await db.serverCharacter.findUnique({
    where: { id: id },
    include: { base: select?.base ? { select: { ...select?.base } } : false },
  });

  if (!character) throw new Error("Character could not be found");

  return character;
};

/**
 * Get all characters registered to a specific server
 * @param server_id - string
 * @param select optional, to set which properties should be included - {
    select: { [key: string]: boolean };
    base?: { [key: string]: boolean };
 * @returns array of server characters with either original properties or custom properties
    to include character base properties, please use the base property of the select object
 */
export const getServerCharacters = async (
  server_id: string,
  select?: {
    select: { [key: string]: boolean };
    base?: { [key: string]: boolean };
  },
) => {
  if (select?.select) {
    const characters = await db.serverCharacter.findMany({
      where: { server_id: server_id },
      select: {
        ...select?.select,
        base: select.base ? { select: { ...select?.base } } : false,
      },
    });

    return characters;
  }

  const characters = await db.serverCharacter.findMany({
    where: { server_id: server_id },
    include: { base: select?.base ? { select: { ...select?.base } } : false },
  });

  return characters;
};

/**
 * Update a user-bound character base
 * @param character_id string - character base id
 * @param data {name?: string, description?: string, image?: string}
 * @returns The updated character ({id: string, owner_id: string, name: string, description: string | null, image: string | null})
 */
export const updateCharacterBase = async (
  character_id: string,
  data: { name?: string; description?: string; image?: string },
): Promise<CharacterBase> => {
  const character = await db.characterBase.update({
    where: { id: character_id },
    data,
  });

  return character;
};

/**
 * Update server-specific character configuration
 * @param server_id - string
 * @param data {vitals_count?: number, vitals_names?: string[], attributes_count?: number, attributes_names?: string[], statics_count?: number, statics_names?: string[]}
 * @returns the updated configuration {id: number, server_id: string, vitals_count: number, vitals_names: string[], attributes_count: number, attributes_names: string[], statics_count: number, statics_names: string[]}
 */
export const updateServerCharacterConfig = async (
  server_id: string,
  data: {
    vitals_count?: number;
    vitals_names?: string[];
    attributes_count?: number;
    attributes_names?: string[];
    statics_count?: number;
    statics_names?: string[];
  },
): Promise<CharacterConfig> => {
  const config = db.serverCharacterConfig.update({
    where: { server_id: server_id },
    data,
  });

  return config;
};

/**
 * Update server character instance
 * @param character_id - string
 * @param data {class: string, level: number, vitals: number[], attributes: number[], statics: number[], skills: string, items: string;}
 * @returns updated server character {id: string, base_id: string, server_id: string, class: string, level: number, experience: number, vitals: number[], attributes: number[], statics: number[], skills: string, items: string;}
 */
export const updateServerCharacter = async (
  character_id: string,
  data: {
    class?: string;
    level?: number;
    vitals?: number[];
    attributes?: number[];
    statics?: number[];
    skills?: string;
    items?: string;
  },
): Promise<Omit<ServerCharacter, "base">> => {
  const character = db.serverCharacter.update({
    where: { id: character_id },
    data,
  });

  return character;
};

/**
 * Delete character base
 * @param character_id - string
 * @returns deleted character base object
 */
export const deleteCharacterBase = async (
  character_id: string,
): Promise<CharacterBase> => {
  const character = await db.characterBase.delete({
    where: { id: character_id },
  });
  return character;
};

/**
 * Delete server's character configuration by server id
 * @param server_id - string
 * @returns deleted character configuration object
 */
export const deleteServerCharacterConfig = async (
  server_id: string,
): Promise<CharacterConfig> => {
  const config = await db.serverCharacterConfig.delete({
    where: { server_id: server_id },
  });
  return config;
};

/**
 * Delete server character instance
 * @param character_id - string
 * @returns deleted server character object
 */
export const deleteServerCharacter = async (
  character_id: string,
): Promise<Omit<ServerCharacter, "base">> => {
  const character = await db.serverCharacter.delete({
    where: { id: character_id },
  });
  return character;
};
