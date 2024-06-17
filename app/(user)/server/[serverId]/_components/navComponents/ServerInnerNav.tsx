import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import ServerSubMenu from "./ServerSubMenu";
import {
  getServerConfig,
  getServerData,
} from "@/prisma/services/serverService";
import Link from "next/link";
import { getChannels } from "@/prisma/services/channelService";
import getServerAuth from "@/actions/getServerAuth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import checkAuthMatch from "@/utils/checkServerAuthMatch";
import ContextMenu from "../../chat/[channelId]/_components/ContextMenu";
import errorHandler from "@/utils/errorHandler";
import { getServerBoards } from "@/prisma/services/gameBoardService";
import ActiveUserDisplay from "../../../../../_components/ActiveUserDisplay";
import ServerSettingsMenu from "./SettingsMenu";
import ServerInnerNavLink from "./ServerInnerNavLink";

export default async function ServerInnerNav({ id }: { id: string }) {
  const session = await auth();

  if (!session) redirect("/welcome");

  const element: JSX.Element = await errorHandler(
    async () => {
      const server = await getServerData(id);

      const serverAuth = await getServerAuth(
        id,
        (session as ExtendedSession).userId,
      );

      if (!serverAuth) redirect("/server");

      const config = await getServerConfig(id);

      const channels = await getChannels(id);

      const boards = await getServerBoards(id);

      const listChannels = channels.map((channel) => {
        return (
          <li
            key={channel.uid}
            className="w-full px-2 py-1 hover:bg-black25 hover:dark:bg-black75"
          >
            <ContextMenu
              serverId={server.id}
              channelId={channel.uid}
              channelName={channel.channel_name}
            />
          </li>
        );
      });

      const authMatch = checkAuthMatch(serverAuth, config);

      return (
        <ColumnWrapper
          mode="section"
          id="server-inner-nav"
          className="h-full w-full gap-0 border-r border-r-black50 p-0"
        >
          <RowWrapper
            justify="justify-between"
            className="z-30 mb-4 w-full px-2 pt-1"
          >
            <Link href={`/server/${id}`}>
              <h5 className="text-wrap">{server.server_name}</h5>
            </Link>
            <ServerSettingsMenu serverAuth={serverAuth} authMatch={authMatch} />
          </RowWrapper>
          <div className="scrollbar-thin w-full flex-grow overflow-y-auto">
            <ServerInnerNavLink title="Home" to={`/server/${id}/`} />
            <ServerSubMenu title="Channels">
              <ul className="w-full flex-grow">{listChannels}</ul>
              <SubmenuLink
                to={`/server/${id}/chat/createChannel`}
                title="Add Channel"
              />
            </ServerSubMenu>
            <ServerInnerNavLink
              title="Characters"
              to={`/server/${id}/characters`}
            />
            <ServerSubMenu title="Game Boards">
              {boards.map((board) => (
                <SubmenuLink
                  key={board.id}
                  to={`/server/${id}/boards/${board.id}`}
                  title={board.name}
                />
              ))}
              <SubmenuLink
                to={`/server/${id}/boards/create`}
                title="New Board"
              />
            </ServerSubMenu>
            <ServerInnerNavLink title="Notes" to={`/server/${id}/notes`} />
            <ServerInnerNavLink
              title="World Clock"
              to={`/server/${id}/worldclock`}
            />
          </div>
          <ActiveUserDisplay />
        </ColumnWrapper>
      );
    },
    () => {
      return <p>No server data</p>;
    },
  );
  return element;
}

function SubmenuLink({ to, title }: { to: string; title: string }) {
  return (
    <Link
      className="w-full px-2 py-1 hover:bg-black25 hover:dark:bg-black75"
      href={to}
    >
      {title}
    </Link>
  );
}
