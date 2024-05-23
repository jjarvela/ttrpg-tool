"use server";

import { createInvitation } from "@/prisma/services/invitationService";
import { getServerConfig } from "@/prisma/services/serverService";

export default async function createServerInvitation(
  server_id: string,
  max_uses?: number,
) {
  try {
    const config = await getServerConfig(server_id);

    const invitation = await createInvitation(server_id, {
      expires: addDays(new Date(Date.now()).toISOString(), 10).toISOString(),
      max_uses,
      protected: config.protected || false,
    });

    return invitation;
  } catch (e) {
    throw new Error("Something went wrong!");
  }
}

function addDays(date: string, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
