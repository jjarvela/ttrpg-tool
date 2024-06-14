"use server";

import { createServerCharacterConfig } from "@/prisma/services/characterService";
import {
  createServerConfig,
  createServerEntry,
  createServerMember,
  deleteServerData,
} from "../../prisma/services/serverService";
import * as bcrypt from "bcryptjs";

type newServerData = {
  serverData: {
    server_name: string;
    description?: string;
    image?: string;
  };
  configData: {
    protected: boolean;
    password?: string | null;
    explorable: boolean;
    searchable: boolean;
    join_permission: string;
    config_permission: string;
  };
};

export default async function createServer(
  user_id: string,
  data: newServerData,
) {
  if (data.configData.protected && data.configData.password === "") {
    throw new Error("Server is set to protected but no password was given.");
  }
  const server = await createServerEntry(data.serverData);

  const password_hash = await bcrypt.hash(String(data.configData.password), 10);

  try {
    const serverConfig = await createServerConfig({
      ...data.configData,
      server_id: server.id,
      password_hash: data.configData.protected ? password_hash : undefined,
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
  } catch (e) {
    await deleteServerData(server.id);

    throw new Error("Server creation failed.");
  }

  return server;
}
