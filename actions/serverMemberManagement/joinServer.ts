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
  console.log(invitation_id);
  const invitation = await getInvitationById(invitation_id);

  console.log(invitation);

  if (!invitation) return "Invitation has expired.";
  if (typeof invitation === "string") return "Something went wrong.";

  if (new Date(invitation.expires) < new Date(Date.now()))
    return "Invitation has expired.";

  const session = await auth();

  if (!(session as ExtendedSession).userId) return "Something went wrong.";

  const id = (session as ExtendedSession).userId;

  const alreadyThere = await getServerMember(invitation.server_id, id);

  if (typeof alreadyThere === "string") return "Something went wrong.";
  if (alreadyThere) return "You are already a member of this server";

  const config = await getServerConfig(invitation.server_id);

  if (!config || typeof config === "string") return "Something went wrong.";

  if (!password && config.protected)
    return "Please provide the password to join this server.";

  if (password && config.password_hash) {
    const passwordsMatch = await bcrypt.compare(password, config.password_hash);
    if (!passwordsMatch) return "Wrong password.";
  }

  try {
    const member = createServerMember({
      server_id: invitation.server_id,
      member_id: id,
      role: "member",
    });

    if (typeof member === "string") return "Error when trying to join.";
    else {
      await updateInvitation(invitation.id, {
        used_count: invitation.used_count + 1,
      });
      return member;
    }
  } catch (e) {
    return (e as Error).message;
  }
}
