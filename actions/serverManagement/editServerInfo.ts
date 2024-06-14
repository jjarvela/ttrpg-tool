"use server";

import {
  getServerData,
  getServerMember,
  updateServerData,
} from "@/prisma/services/serverService";
import checkAuthMatch from "@/utils/checkServerAuthMatch";
import deleteBlob from "../deleteBlob";

/**
 * This function can be used to update the information of a server
 * @param userId id of the user calling the operation (to check authorisation)
 * @param serverConfig the config of the target server (to get the server id and check for authorisation)
 * @param data {server_name: string, description: string, image?: string (filename of azure blob)}
 * @returns string on error, updated server data on success
 */

export default async function editServerInfo(
  userId: string,
  serverConfig: ServerConfig,
  data: {
    server_name: string;
    description: string | null;
    image?: string | null;
  },
) {
  //get updater information to check their privileges before allowing updates
  const updater = await getServerMember(serverConfig.server_id, userId);

  const auth = checkAuthMatch(updater, serverConfig);

  if (!auth) {
    throw new Error(
      "You don't have the required permissions to alter these settings.",
    );
  }
  try {
    let filename = "";

    if (data.image !== undefined) {
      const original = await getServerData(serverConfig.server_id);
      filename = original.image || "";
    }

    const result = await updateServerData(serverConfig.server_id, data);

    if (filename !== "") {
      deleteBlob(filename);
    }

    return result;
  } catch (e) {
    console.error(e);
    throw new Error("Something went wrong");
  }
}
