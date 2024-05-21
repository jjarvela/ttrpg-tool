"use server";

import { auth } from "@/auth";
import {
  getInvitationById,
  updateInvitation,
} from "@/prisma/services/invitationService";
import {
  createServerMember,
  getServerConfig,
  getServerMember,
} from "@/prisma/services/serverService";
import * as bcrypt from "bcryptjs";

export default async function joinServer(
  invitation_id: string,
  password?: string,
) {
  try {
    const invitation = await getInvitationById(invitation_id);

    if (new Date(invitation.expires) < new Date(Date.now()))
      return "Invitation has expired.";

    const session = await auth();

    if (!(session as ExtendedSession).userId) return "Something went wrong.";

    const id = (session as ExtendedSession).userId;

    try {
      const alreadyThere = await getServerMember(invitation.server_id, id);
      return "You are already a member of this server";
    } catch (e) {
      if ((e as Error).message !== "No user could be found") {
        return "Something went wrong.";
      }
    }

    try {
      const config = await getServerConfig(invitation.server_id);

      if (!password && config.protected)
        return "Please provide the password to join this server.";

      if (password && config.protected && config.password_hash) {
        const passwordsMatch = await bcrypt.compare(
          password,
          config.password_hash,
        );
        if (!passwordsMatch) return "Wrong password.";
      }

      const member = createServerMember({
        server_id: invitation.server_id,
        member_id: id,
        role: "member",
      });

      await updateInvitation(invitation.id, {
        used_count: invitation.used_count + 1,
      });

      return member;
    } catch (e) {
      console.log(e);
      return (e as Error).message;
    }
  } catch (e) {
    if ((e as Error).message === "No invitation found") {
      return "Invitation has expired.";
    } else {
      return "Something went wrong.";
    }
  }
}
