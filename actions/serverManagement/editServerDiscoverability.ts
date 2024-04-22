"use server";

import {
  getServerMember,
  updateServerConfig,
} from "@/prisma/services/serverService";
import checkAuthMatch from "@/utils/checkServerAuthMatch";

export default async function editServerDiscoverability(
  userId: string,
  serverConfig: ServerConfig,
  data: {
    searchable?: boolean;
    explorable?: boolean;
    join_permission?: string;
  },
) {
  //get updater information to check their privileges before allowing updates
  const updater = await getServerMember(serverConfig.server_id, userId);
  if (!updater || typeof updater === "string")
    return "An unexpected error occurred.";
  const auth = await checkAuthMatch(updater, serverConfig);

  if (!auth)
    return "You don't have the required permissions to alter these settings.";
  try {
    const updatedConfig = await updateServerConfig(serverConfig.server_id, {
      searchable: data.searchable,
      explorable: data.explorable,
    });
    console.log(updatedConfig);
    return updatedConfig;
  } catch (e) {
    return (e as Error).message;
  }
}
