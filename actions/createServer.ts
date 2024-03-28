"use server";

import {
  createServerConfig,
  createServerEntry,
  createServerMember,
} from "../prisma/services/serverService";
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
    });
    if (typeof server === "string")
      return "Something went wrong. Please try again.";

    const password_hash = await bcrypt.hash(String(data.password), 10);

    const serverConfig = await createServerConfig({
      server_id: server.id,
      config_permission: data.settingsRightsHolders,
      protected: data.isProtected,
      password_hash: data.isProtected ? password_hash : undefined,
      explorable: data.explorePermission,
      searchable: data.searchPermission,
    });

    if (typeof serverConfig === "string")
      return "Something went wrong while setting up the server.";

    const serverOwner = await createServerMember({
      server_id: server.id,
      member_id: user_id,
      role: "admin",
    });

    if (typeof serverOwner === "string")
      return "Something went wrong while setting up the server.";

    return server;
  } catch (e) {
    return (e as Error).message;
  }
}
