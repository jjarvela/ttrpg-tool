import Main from "@/app/_components/wrappers/PageMain";
import LatestNotes from "./_components/LatestNotes";
import LatestMessages from "./_components/LatestMessages";
import { getUnreadForUserForServer } from "@/prisma/services/notificationService";
import { auth } from "@/auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default async function ServerHome({ params }: { params: Params }) {
  const serverId = params.serverId;

  async function fetchUnreadMessages() {
    const session = await auth();
    console.log(session, serverId);
    if (session && serverId) {
      const newMessagesData = await getUnreadForUserForServer(
        (session as ExtendedSession).userId,
        serverId,
        {
          id: true,
          message: true,
          created_at: true,
        },
      );

      return newMessagesData;
    }

    return [];
  }

  const newMessages = await fetchUnreadMessages();

  return (
    <Main className="grid grid-cols-1 gap-4 p-6 lg:grid-cols-2">
      {newMessages && newMessages.length > 0 ? (
        <LatestMessages newMessages={newMessages} />
      ) : (
        <div>No new messages</div>
      )}
      <LatestNotes />
    </Main>
  );
}
