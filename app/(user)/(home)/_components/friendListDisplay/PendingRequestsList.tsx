import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import PendingThumbnail from "./PendingThumbnail";

export default function PendingRequestsList({
  pending,
}: {
  pending: FriendRequest[];
}) {
  return (
    <ColumnWrapper className="w-full">
      {pending.length < 1 && (
        <p>You have no pending friend requests at this time.</p>
      )}
      {pending.length > 0 &&
        pending.map((request) => (
          <PendingThumbnail key={request.recipient_id} request={request} />
        ))}
    </ColumnWrapper>
  );
}
