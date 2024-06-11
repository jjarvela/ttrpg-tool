"use client";

import MaterialSymbolsPersonPlayOutline from "@/public/icons/MaterialSymbolsPersonPlayOutline";
import MaterialSymbolsPersonRaisedHandOutlineRounded from "@/public/icons/MaterialSymbolsPersonRaisedHandOutlineRounded";
import { usePathname } from "next/navigation";
import UserSideMenuLink from "./UserSideMenuLink";
import { FriendRequest } from "@prisma/client";

export default function UserSideNav({
  friendRequests,
}: {
  friendRequests: FriendRequest[];
}) {
  const pathname = usePathname();

  return (
    <div className="my-1 border-b-[1px] border-black50 py-1">
      <UserSideMenuLink
        title="Friends"
        to="/"
        icon={
          <MaterialSymbolsPersonRaisedHandOutlineRounded className="flex-shrink-0 text-2xl" />
        }
        isActive={pathname === "/" || pathname.includes("friends")}
        notifications={friendRequests.length > 0}
      />
      <UserSideMenuLink
        title="Characters"
        to="/characters"
        icon={
          <MaterialSymbolsPersonPlayOutline className="flex-shrink-0 text-2xl" />
        }
        isActive={pathname.includes("characters")}
      />
    </div>
  );
}
