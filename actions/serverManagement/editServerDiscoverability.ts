"use server";

import {
  getServerMember,
  updateServerConfig,
} from "@/prisma/services/serverService";
import checkAuthMatch from "@/utils/checkServerAuthMatch";

/**
 * This server action is for updating the discoverability preferences of a server
 * @param userId the ID of the user calling the operation (used to check authorisation)
 * @param serverConfig the configuration options of the target server (to get server ID and check authorisation)
 * @param data {searchable?: boolean, explorable?: boolean, join_permission?: string}
 * @returns string on error, updated server config on success
 */

export default async function editServerDiscoverability(
  userId: string,
  serverConfig: ServerConfig,
  data: {
    searchable?: boolean;
    explorable?: boolean;
    join_permission?: string;
  },
): Promise<ServerConfig> {
  //get updater information to check their privileges before allowing updates
  const updater = await getServerMember(serverConfig.server_id, userId);

  const auth = checkAuthMatch(updater, serverConfig);

  if (!auth) {
    throw new Error(
      "You don't have the required permissions to alter these settings.",
    );
  }
  try {
    const updatedConfig = await updateServerConfig(serverConfig.server_id, {
      searchable: data.searchable,
      explorable: data.explorable,
      join_permission: data.join_permission,
    });

    return updatedConfig;
  } catch (e) {
    console.error(e);
    throw new Error("Something went wrong");
  }
}
