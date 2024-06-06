import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import Main from "@/app/_components/wrappers/PageMain";
import { auth } from "@/auth";
import { getUserReceivedRequests } from "@/prisma/services/friendService";
import errorHandler from "@/utils/errorHandler";
import { redirect } from "next/navigation";
import ReceivedRequestObject from "./_components/ReceivedRequestObject";

export default async function FriendRequestPage() {
  const session = await auth();

  if (!session || !(session as ExtendedSession).userId)
    return redirect("/welcome");

  const element: JSX.Element = await errorHandler(
    async () => {
      const friendRequests = await getUserReceivedRequests(
        (session as ExtendedSession).userId,
      );

      if (friendRequests.length < 1) {
        return <p>You have no friend requests at this time.</p>;
      }

      return (
        <ColumnWrapper className="w-full">
          {friendRequests.map((request) => (
            <ReceivedRequestObject
              key={request.id + request.requester_id}
              request={request}
            />
          ))}
        </ColumnWrapper>
      );
    },
    () => (
      <p className="text-warning">
        Something went wrong. Please refresh the page.
      </p>
    ),
  );

  return (
    <Main className="w-full items-center pb-10">
      <h2>Friend Requests</h2>
      {element}
    </Main>
  );
}
