import React from "react";
import ColumnWrapper from "./wrappers/ColumnWrapper";
import MaterialSymbolsLight3p from "../../public/icons/MaterialSymbolsLight3p";
import { twMerge } from "tailwind-merge";
import MenuIconServer from "./menu_items/MenuIconServer";
import MenuButtonLogout from "./menu_items/MenuButtonLogout";
import MenuButtonNewServer from "./menu_items/MenuButtonNewServer";
import { auth } from "../../auth";
import { getUserServers } from "../../prisma/services/userService";
import FeedbackCard from "./FeedbackCard";
import { Session } from "next-auth";

//global types file doesn't like imports so we're declaring this here for now
declare global {
  interface ExtendedSession extends Session {
    userId: string;
  }
}

const SideMenu = async ({ className }: { className?: string }) => {
  const session = await auth();

  if (!session || !(session as ExtendedSession).userId)
    return <FeedbackCard type="error" message="Something went wrong!" />;

  const servers = await getUserServers((session as ExtendedSession).userId, {
    id: true,
    server_name: true,
  });

  console.log(servers);

  if (typeof servers === "string")
    return <FeedbackCard type="error" message="Something went wrong!" />;

  return (
    <nav className="relative">
      <ColumnWrapper
        align="items-center"
        className={twMerge(
          "bg-color-dark sticky left-0 top-0 z-[99] mr-2 h-screen border-r-2 border-gray-600",
          className ? className : "",
        )}
      >
        <MaterialSymbols3pOutline width={40} height={40} />
        <ul>
          {servers.map((server) => (
            <li key={server.id}>
              <MenuIconServer server={server} />
            </li>
          ))}
        </ul>
        <div className="group relative">
          <MenuButtonNewServer />
        </div>
        <MenuButtonLogout />
      </ColumnWrapper>
    </nav>
  );
};

export default SideMenu;
