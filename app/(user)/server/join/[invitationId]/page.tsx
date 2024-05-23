import FeedbackCard from "@/app/_components/FeedbackCard";
import { getInvitationById } from "@/prisma/services/invitationService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import InvitationNotValid from "./_components/InvitationNotValid";
import PasswordProtected from "./_components/PasswordProtected";
import NotProtected from "./_components/NotProtected";
import { getServerData } from "@/prisma/services/serverService";

export default async function JoinServer({ params }: { params: Params }) {
  const id = params.invitationId;

  try {
    const invitation = await getInvitationById(id);

    checkValidity(invitation);

    const server: unknown = await getServerData(invitation.server_id, {
      select: { server_name: true },
    });

    if (invitation.protected)
      return (
        <PasswordProtected
          invitationId={invitation.id}
          serverName={(server as { server_name: string }).server_name}
        />
      );

    return (
      <NotProtected
        invitationId={invitation.id}
        serverName={(server as { server_name: string }).server_name}
      />
    );
  } catch (e) {
    if ((e as Error).message.includes("invitation")) {
      return <InvitationNotValid />;
    }

    return <FeedbackCard type="error" message="Something went wrong!" />;
  }
}

function checkValidity(invitation: {
  id: string;
  server_id: string;
  expires: string;
  used_count: number;
  max_uses: number | null;
  protected: boolean;
}) {
  if (new Date(invitation.expires) < new Date(Date.now())) {
    throw new Error("This invitation is invalid");
  }
  if (invitation.max_uses && invitation.used_count >= invitation.max_uses) {
    throw new Error("This invitation is invalid");
  }
  return true;
}
