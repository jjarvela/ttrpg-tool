import FeedbackCard from "@/app/_components/FeedbackCard";
import { getInvitationById } from "@/prisma/services/invitationService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import InvitationNotValid from "./_components/InvitationNotValid";
import PasswordProtected from "./_components/PasswordProtected";
import NotProtected from "./_components/NotProtected";
import {
  getServerData,
  getServerMembers,
} from "@/prisma/services/serverService";
import { auth } from "@/auth";
import { getUserById } from "@/prisma/services/userService";
import { redirect } from "next/navigation";

export default async function JoinServer({ params }: { params: Params }) {
  const id = params.invitationId;

  try {
    const session = await auth();

    if (!session) {
      redirect(`/login?inv=${id}`);
    }

    const invitation = await getInvitationById(id);

    checkValidity(invitation);

    const server: { server_name: string } = await getServerData(
      invitation.server_id,
      {
        select: { server_name: true },
      },
    );

    const members = await getServerMembers(invitation.server_id);
    const user = await getUserById((session as ExtendedSession).userId, {
      blocklist: true,
    });

    const blocked = members.filter(
      (member) => user.blocklist.indexOf(member.member_id) > -1,
    );

    if (invitation.protected)
      return (
        <PasswordProtected
          invitationId={invitation.id}
          serverName={server.server_name}
          hasBlocked={blocked.length > 0}
        />
      );

    return (
      <NotProtected
        invitationId={invitation.id}
        serverName={server.server_name}
        hasBlocked={blocked.length > 0}
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
