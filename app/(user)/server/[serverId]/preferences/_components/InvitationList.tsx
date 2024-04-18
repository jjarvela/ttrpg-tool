import FeedbackCard from "@/app/_components/FeedbackCard";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { getInvitationsByServer } from "@/prisma/services/invitationService";
import InvitationObject from "./InvitationObject";

export default async function ServerInvitationsList({
  serverId,
}: {
  serverId: string;
}) {
  const invitations = await getInvitationsByServer(serverId);
  if (!invitations || typeof invitations === "string")
    return <FeedbackCard type="error" message="Something went wrong!" />;
  if (invitations.length === 0) return <p>There are no active invitations.</p>;
  return (
    <ColumnWrapper>
      {invitations.map((item) => (
        <InvitationObject key={item.id} invitation={item} />
      ))}
    </ColumnWrapper>
  );
}
