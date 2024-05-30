import React from "react";
import ColumnWrapper from "./wrappers/ColumnWrapper";
import { twMerge } from "tailwind-merge";
import MenuIconServer from "./menu_items/MenuIconServer";
import MenuButtonLogout from "./menu_items/MenuButtonLogout";
import MenuButtonNewServer from "./menu_items/MenuButtonNewServer";
import { auth } from "../../auth";
import { getUserServers } from "../../prisma/services/userService";
import FeedbackCard from "./FeedbackCard";
import { Session } from "next-auth";
import MaterialSymbols3pOutline from "@/public/icons/MaterialSymbols3pOutline";
import Icon from "./Icon";
import Link from "next/link";
import { getUnreadForUser } from "@/prisma/services/notificationService";
import errorHandler from "@/utils/errorHandler";
import { redirect } from "next/navigation";

//global types file doesn't like imports so we're declaring this here for now
declare global {
  interface ExtendedSession extends Session {
    userId: string;
  }
}

const SideMenu = async ({ className }: { className?: string }) => {
  const session = await auth();

  if (!session || !(session as ExtendedSession).userId)
    return redirect("/welcome");

  const element: JSX.Element = await errorHandler(
    async () => {
      const servers = await getUserServers(
        (session as ExtendedSession).userId,
        {
          id: true,
          server_name: true,
          image: true,
        },
      );

      const notifications = await getUnreadForUser(
        (session as ExtendedSession).userId,
        { id: true, type: true, server_id: true },
      );

      const unreadNoServer = notifications.filter(
        (item) => item.server_id === null,
      );

      const serversWithUnread = notifications.map((item) => item.server_id);

      return (
        <ColumnWrapper
          align="items-center"
          className={twMerge(
            "sticky left-0 top-0 z-[99] h-screen border-r-[1px] border-black50 bg-primary dark:bg-black",
            className ? className : "",
          )}
        >
          <Link href={"/"} className="relative">
            <MaterialSymbols3pOutline
              className="opacity-60"
              width={40}
              height={40}
            />
            {unreadNoServer.length > 0 && (
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                className="absolute -right-3 top-0 fill-accent dark:fill-primary"
              >
                <circle r={6} cx={8} cy={8} />
              </svg>
            )}
          </Link>
          <ul className="scrollbar-thin max-h-[70%] overflow-y-auto overflow-x-hidden pr-2">
            {servers.map((server) => (
              <li key={server.id}>
                <MenuIconServer
                  server={server}
                  icon={
                    <Icon
                      filename={server.image || ""}
                      alt={server.server_name}
                    />
                  }
                  hasUnread={serversWithUnread.indexOf(server.id) > -1}
                />
              </li>
            ))}
          </ul>
          <div className="group relative">
            <MenuButtonNewServer />
          </div>
          <MenuButtonLogout />
        </ColumnWrapper>
      );
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong!" />;
    },
  );

  return <nav className="relative">{element}</nav>;
};

export default SideMenu;
