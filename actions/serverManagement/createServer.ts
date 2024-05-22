"use server";

import { createServerCharacterConfig } from "@/prisma/services/characterService";
import {
  createServerConfig,
  createServerEntry,
  createServerMember,
} from "../../prisma/services/serverService";
import * as bcrypt from "bcryptjs";

type newServerData = {
  serverName: string;
  description?: string;
  image?: string;
  isProtected?: boolean;
  password?: string;
  explorePermission?: boolean;
  searchPermission?: boolean;
  settingsRightsHolders: string;
};

export default async function createServer(
  user_id: string,
  data: newServerData,
) {
  if (data.isProtected && data.password === "") {
    return "Server is set to protected but no password was given.";
  }

  try {
    const server = await createServerEntry({
      server_name: data.serverName,
      description: data.description,
      image: data.image || undefined,
    });

    const password_hash = await bcrypt.hash(String(data.password), 10);

    const serverConfig = await createServerConfig({
      server_id: server.id,
      config_permission: data.settingsRightsHolders,
      protected: data.isProtected,
      password_hash: data.isProtected ? password_hash : undefined,
      explorable: data.explorePermission,
      searchable: data.searchPermission,
    });

    const serverOwner = await createServerMember({
      server_id: server.id,
      member_id: user_id,
      role: "admin",
    });

    const serverCharacterConfig = await createServerCharacterConfig(server.id, {
      vitals_count: 1,
      vitals_names: ["HP"],
      attributes_count: 2,
      attributes_names: ["Strength", "Dexterity"],
      statics_count: 2,
      statics_names: ["Stealth", "Persuasion"],
    });

    return server;
  } catch (e) {
    throw new Error("Something went wrong. Please try again.");
  }
}
