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
      throw new Error("Invitation has expired.");

    const session = await auth();

    if (!(session as ExtendedSession).userId)
      throw new Error("Something went wrong.");

    const id = (session as ExtendedSession).userId;

    try {
      const alreadyThere = await getServerMember(invitation.server_id, id);
      throw new Error("You are already a member of this server");
    } catch (e) {
      if ((e as Error).message !== "No user could be found") {
        throw new Error("Something went wrong.");
      }
    }

    try {
      const config = await getServerConfig(invitation.server_id);

      if (!password && config.protected)
        throw new Error("Please provide the password to join this server.");

      if (password && config.protected && config.password_hash) {
        const passwordsMatch = await bcrypt.compare(
          password,
          config.password_hash,
        );
        if (!passwordsMatch) throw new Error("Wrong password.");
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
      throw new Error("Something went wrong.");
    }
  } catch (e) {
    if ((e as Error).message === "No invitation found") {
      throw new Error("Invitation has expired.");
    } else {
      throw new Error("Something went wrong.");
    }
  }
}
