"use server";

import { deleteInvitation } from "@/prisma/services/invitationService";

export default async function deleteServerInvitation(invitation_id: string) {
  try {
    const invitation = await deleteInvitation(invitation_id);
    return invitation;
  } catch (e) {
    return "Something went wrong";
  }
}
