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
          id: true,
          name: true,
          image: true,
        },
      });

      return charactersData;
    }

    return [];
  }
  const latestCharacters =
    (await getHomeServerCharacters()) as unknown as HomeCharactersProps["initialCharacters"];
  console.log(latestCharacters);

  return (
    <Main className="grid h-full grid-cols-1 gap-6 p-3 lg:grid-cols-2">
      <div className="scrollbar-thin h-96 flex-grow overflow-auto bg-black25 p-3 lg:h-full dark:bg-black75">
        {newMessages && newMessages.length > 0 ? (
          <LatestMessages newMessages={newMessages} serverId={serverId} />
        ) : (
          <div className="text-center">No new messages</div>
        )}
      </div>
      <div className="h-full flex-grow">
        <HomeCharacters
          initialCharacters={latestCharacters}
          serverId={serverId}
        />
      </div>
      <div className="scrollbar-thin flex-grow bg-black25 p-5 dark:bg-black75">
        <h2 className="mx-auto mb-2 text-lg font-semibold text-gray-800 dark:text-white">
          Online Users
        </h2>
        <OnlineUsers
          user={session ? (session as ExtendedSession).userId : ""}
          serverId={serverId}
          session={session}
        />
      </div>
      <div className="flex-grow">
        <LatestNotes />
      </div>
    </Main>
  );
}
