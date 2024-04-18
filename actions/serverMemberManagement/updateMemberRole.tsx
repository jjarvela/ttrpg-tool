"use server";

import {
  getServerMember,
  updateServerMember,
} from "@/prisma/services/serverService";

/**
 * This function can be used to update a user's server-specific role
 * Only admin can demote moderators or promote another user to admin
 * Only one user can be admin
 * moderators can promote members to moderators but cannot demote other moderators or change the admin
 * @param server_id id of the target server
 * @param target_member_id id of the member whose role is being updated
 * @param updater_user_id id of the user updating the role
 * @param role the role the user is to be assigned
 * @returns error message as string on error, updated server member on success
 */

export default async function updateMemberRole(
  server_id: string,
  target_member_id: string,
  updater_user_id: string,
  role: "admin" | "moderator" | "member",
) {
  //get updater information to check their privileges before allowing updates
  const updater = await getServerMember(server_id, updater_user_id);
  if (!updater || typeof updater === "string")
    return "An unexpected error occurred.";
  if (updater.role === "member")
    return "Only admin and moderators can change user roles.";

  if (role === "admin" && updater.role !== "admin")
    return "Only the admin can promote another user to admin.";

  const targetMember = await getServerMember(server_id, target_member_id);
  if (!targetMember || typeof targetMember === "string")
    return "An unexpected error occurred.";

  if (role === targetMember.role) return "The user already has that role.";

  //disallow role change if target is admin or role is member and updater is not admin
  if (
    targetMember.role === "admin" ||
    (role === "member" && updater.role !== "admin")
  )
    return "You are not authorised to update this user's role.";

  //if all authorisations pass, update role
  if (role !== "admin") {
    try {
      const updatedMember = await updateServerMember(
        server_id,
        targetMember.member_id,
        { role },
      );
      return updatedMember;
    } catch (e) {
      return (e as Error).message;
    }
  } else {
    try {
      const demotedAdmin = await updateServerMember(
        server_id,
        updater.member_id,
        { role: "moderator" },
      );
      if (!demotedAdmin || typeof demotedAdmin === "string")
        return "An unexpected error occurred.";
      const updatedMember = await updateServerMember(
        server_id,
        targetMember.member_id,
        { role },
      );
      return updatedMember;
    } catch (e) {
      return (e as Error).message;
    }
  }
}
