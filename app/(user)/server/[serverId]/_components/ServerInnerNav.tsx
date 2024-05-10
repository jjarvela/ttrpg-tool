import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import ServerSubMenu from "./ServerSubMenu";
import ServerSettingsMenu from "./SettingsMenu";
import {
  getServerConfig,
  getServerData,
} from "@/prisma/services/serverService";
import ServerInnerNavLink from "./ServerInnerNavLink";
import Link from "next/link";
import ServerUserDisplay from "./ServerUserDisplay";
import { getChannels } from "@/prisma/services/channelService";
import getServerAuth from "@/actions/getServerAuth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import checkAuthMatch from "@/utils/checkServerAuthMatch";
import ContextMenu from "../chat/[channelId]/_components/ContextMenu";

export default async function ServerInnerNav({ id }: { id: string }) {
  const server = await getServerData(id);
  const session = await auth();
  if (!session) redirect("/welcome");
  const serverAuth = await getServerAuth(
    id,
    (session as ExtendedSession).userId,
  );
  if (!serverAuth) redirect("/server");
  const config = await getServerConfig(id);
  if (
    !server ||
    typeof server === "string" ||
    !config ||
    typeof config === "string"
  )
    return <p>No server data</p>;

  if (!server || typeof server === "string") return <p>No server data</p>;
  const channels = await getChannels(id);
  if (!channels || typeof channels === "string") return <p>No channels</p>;
  const listChannels = channels.map((channel) => {
    return (
      <li key={channel.uid}>
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
        <ServerSubMenu title="Channels">
          <ul className="flex-grow">{listChannels}</ul>
          <Link href={`/server/${id}/chat/createChannel`}>{"add channel"}</Link>
        </ServerSubMenu>
        <ServerInnerNavLink
          title="Characters"
          to={`/server/${id}/characters`}
        />
        <ServerSubMenu title="Boards"></ServerSubMenu>
        <ServerInnerNavLink title="Dice" to={`/server/${id}/dice`} />
        <ServerInnerNavLink
          title="World Clock"
          to={`/server/${id}/worldclock`}
        />
      </div>
      <ServerUserDisplay />
    </ColumnWrapper>
  );
}
