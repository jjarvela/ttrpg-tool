import Main from "@/app/_components/wrappers/PageMain";
import LatestNotes from "./_components/LatestNotes";
import LatestMessages, { NewMessage } from "./_components/LatestMessages";
import { getUnreadForUserForServerWithSender } from "@/prisma/services/notificationService";
import { auth } from "@/auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default async function ServerHome({ params }: { params: Params }) {
  const serverId = params.serverId;

  async function fetchUnreadMessages() {
    const session = await auth();
    console.log(session, serverId);
    if (session && serverId) {
      const newMessagesData = await getUnreadForUserForServerWithSender(
        (session as ExtendedSession).userId,
        serverId,
      );

      return newMessagesData;
    }

    return [];
  }

  const newMessages = (await fetchUnreadMessages()).filter(
    (message) => message !== null,
  ) as NewMessage[];

  return (
    <Main className="grid grid-cols-1 grid-rows-3 gap-4 p-6 md:grid-rows-2 lg:grid-cols-2">
      {newMessages && newMessages.length > 0 ? (
        <LatestMessages newMessages={newMessages} serverId={serverId} />
      ) : (
        <div className="overflow-auto bg-black75 p-5">No new messages</div>
      )}
      <LatestNotes />
    </Main>
  );
}