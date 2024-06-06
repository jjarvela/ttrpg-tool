import Main from "@/app/_components/wrappers/PageMain";
import LatestNotes from "./_components/LatestNotes";
import LatestMessages, { NewMessage } from "./_components/LatestMessages";
import { getUnreadForUserForServerWithSender } from "@/prisma/services/notificationService";
import { auth } from "@/auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import OnlineUsers from "./_components/OnlineUsers";
import { getServerCharacters } from "@/prisma/services/characterService";
import HomeCharacters, {
  HomeCharactersProps,
} from "./_components/HomeCharacters";

export default async function ServerHome({ params }: { params: Params }) {
  const serverId = params.serverId;
  const session = await auth();

  async function fetchUnreadMessages() {
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

  async function getHomeServerCharacters() {
    if (serverId) {
      const charactersData = await getServerCharacters(serverId, {
        select: {
          level: true,
          vitals: true,
          vitals_max: true,
          class: true,
        },
        base: {
          name: true,
          image: true,
        },
      });

      return charactersData;
    }

    return [];
  }
  const latestCharacters =
    (await getHomeServerCharacters()) as unknown as HomeCharactersProps["latestCharacters"];
  console.log(latestCharacters);

  return (
    <Main className="grid grid-cols-1 grid-rows-3 gap-4 p-6 md:grid-rows-3 lg:grid-flow-col lg:grid-cols-2">
      {newMessages && newMessages.length > 0 ? (
        <LatestMessages newMessages={newMessages} serverId={serverId} />
      ) : (
        <div className="grid overflow-auto bg-black75 p-5">No new messages</div>
      )}
      <div className="grid lg:row-span-2">
        <HomeCharacters latestCharacters={latestCharacters} />
      </div>
      <div className="scrollbar-thin grid overflow-auto bg-black75 p-5 lg:h-60">
        <h2 className="mx-auto mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
          Online Users
        </h2>
        <OnlineUsers
          user={session ? (session as ExtendedSession).userId : ""}
        />
      </div>
      <div className="grid">
        <LatestNotes />
      </div>
    </Main>
  );
}
