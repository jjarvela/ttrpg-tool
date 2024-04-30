import FeedbackCard from "@/app/_components/FeedbackCard";
import { getInvitationById } from "@/prisma/services/invitationService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import InvitationNotValid from "./_components/InvitationNotValid";
import PasswordProtected from "./_components/PasswordProtected";
import NotProtected from "./_components/NotProtected";
import { getServerData } from "@/prisma/services/serverService";

export default async function JoinServer({ params }: { params: Params }) {
  const id = params.invitationId;

  const invitation = await getInvitationById(id);

  if (typeof invitation === "string")
    return <FeedbackCard type="error" message="Something went wrong!" />;

  const invitationIsValid = checkValidity(invitation);

  if (!invitation || !invitationIsValid) return <InvitationNotValid />;

  const server = await getServerData(invitation.server_id, {
    server_name: true,
  });

  if (!server || typeof server === "string")
    return <FeedbackCard type="error" message="Something went wrong!" />;

  if (invitation.protected)
    return (
      <PasswordProtected
        invitationId={invitation.id}
        serverName={server.server_name}
      />
    );

  return (
    <NotProtected
      invitationId={invitation.id}
      serverName={server.server_name}
    />
  );
}

function checkValidity(
  invitation: {
    id: string;
    server_id: string;
    expires: string;
    used_count: number;
    max_uses: number | null;
    protected: boolean;
  } | null,
) {
  if (!invitation) return false;
  if (new Date(invitation.expires) < new Date(Date.now())) return false;
  if (invitation.max_uses && invitation.used_count >= invitation.max_uses)
    return false;
  return true;
}
