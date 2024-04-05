import { db } from "../db";

export const createInvitation = async (
  server_id: string,
  options: { expires: string; max_uses?: number; protected: boolean },
) => {
  try {
    const invitation = await db.invitation.create({
      data: { server_id, used_count: 0, ...options },
    });
    return invitation;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getInvitationsByServer = async (server_id: string) => {
  try {
    const invitations = await db.invitation.findMany({ where: { server_id } });
    return invitations;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getInvitationById = async (invitation_id: string) => {
  try {
    const invitation = await db.invitation.findUnique({
      where: { id: invitation_id },
    });
    return invitation;
  } catch (e) {
    return (e as Error).message;
  }
};

export const updateInvitation = async (
  invitation_id: string,
  options: { used_count?: number; protected?: boolean },
) => {
  try {
    const invitation = await db.invitation.update({
      where: { id: invitation_id },
      data: options,
    });
    return invitation;
  } catch (e) {
    return (e as Error).message;
  }
};

export const deleteInvitation = async (invitation_id: string) => {
  try {
    const invitation = await db.invitation.delete({
      where: { id: invitation_id },
    });
    return invitation;
  } catch (e) {
    return (e as Error).message;
  }
};
