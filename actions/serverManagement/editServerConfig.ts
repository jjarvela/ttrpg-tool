"use server";

import {
  getServerMember,
  updateServerConfig,
} from "@/prisma/services/serverService";
import * as bcrypt from "bcryptjs";
import checkAuthMatch from "@/utils/checkServerAuthMatch";

export default async function editServerConfig(
  userId: string,
  serverConfig: ServerConfig,
  data: {
    protected?: boolean | null;
    config_permission?: string;
    password?: string;
  },
) {
  //make sure there is at least a previous password in the database if protected is set to true
  if (data.protected && !serverConfig.password_hash && !data.password)
    return "Password protection is chosen but no password has been set.";

  //get updater information to check their privileges before allowing updates
  const updater = await getServerMember(serverConfig.server_id, userId);
  if (!updater || typeof updater === "string")
    return "An unexpected error occurred.";
  const auth = await checkAuthMatch(updater, serverConfig);

  if (!auth)
    return "You don't have the required permissions to alter these settings.";
  try {
    if (!data.password) {
      const updatedConfig = await updateServerConfig(
        serverConfig.server_id,
        data,
      );
      console.log(updatedConfig);
      return updatedConfig;
    } else {
      const password_hash = await bcrypt.hash(String(data.password), 10);

      const updatedConfig = await updateServerConfig(serverConfig.server_id, {
        protected: data.protected,
        config_permission: data.config_permission,
        password_hash,
      });
      console.log(updatedConfig);
      return updatedConfig;
    }
  } catch (e) {
    return (e as Error).message;
  }
}
