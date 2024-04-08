import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import ServerSubMenu from "./ServerSubMenu";
import ServerSettingsMenu from "./SettingsMenu";
import { getServerData } from "@/prisma/services/serverService";
import ServerInnerNavLink from "./ServerInnerNavLink";
import Link from "next/link";
import ServerUserDisplay from "./ServerUserDisplay";

export default async function ServerInnerNav({ id }: { id: string }) {
  const server = await getServerData(id);

  if (!server || typeof server === "string") return <p>No server data</p>;
  return (
    <ColumnWrapper
      mode="section"
      id="server-inner-nav"
      className="h-full w-40 gap-0 border-r border-r-black50 p-0 md:max-w-[15%]"
    >
      <RowWrapper
        justify="justify-between"
        className="z-30 mb-4 w-full px-2 pt-1"
      >
        <Link href={`/server/${id}`}>
          <h5 className="text-wrap">{server.server_name}</h5>
        </Link>
        <ServerSettingsMenu server_id={id} />
      </RowWrapper>
      <div className="scrollbar-thin w-full flex-grow overflow-y-auto">
        <ServerSubMenu title="Channels">
          <a>Channel</a>
          <a>Channel</a>
          <a>Channel</a>
          <a>Channel</a>
          <a>Channel</a>
          <a>Channel</a>
          <a>Channel</a>
          <a>Channel</a>
          <a>Channel</a>
          <a>Channel</a>
          <a>Channel</a>
          <a>Channel</a>
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
