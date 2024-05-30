import db from "../db";

export const createInvitation = async (
  server_id: string,
  options: { expires: string; max_uses?: number; protected: boolean },
): Promise<Invitation> => {
  const invitation = await db.invitation.create({
    data: { server_id, used_count: 0, ...options },
  });

  return invitation;
};

export const getInvitationsByServer = async (
  server_id: string,
): Promise<Invitation[]> => {
  const invitations = await db.invitation.findMany({ where: { server_id } });

  return invitations;
};

export const getInvitationById = async (
  invitation_id: string,
): Promise<Invitation> => {
  const invitation = await db.invitation.findUnique({
    where: { id: invitation_id },
  });

  if (!invitation) throw new Error("No invitation found");

  return invitation;
};

export const updateInvitation = async (
  invitation_id: string,
  options: { used_count?: number; protected?: boolean },
): Promise<Invitation> => {
  const invitation = await db.invitation.update({
    where: { id: invitation_id },
    data: options,
  });

  return invitation;
};

export const deleteInvitation = async (
  invitation_id: string,
): Promise<Invitation> => {
  const invitation = await db.invitation.delete({
    where: { id: invitation_id },
  });

  return invitation;
};
