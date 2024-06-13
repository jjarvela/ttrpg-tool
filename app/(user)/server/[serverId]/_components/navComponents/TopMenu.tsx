"use client";
import IconoirHexagonDice from "@/public/icons/IconoirHexagonDice";
import MaterialSymbolsAndroidMessagesOutline from "@/public/icons/MaterialSymbolsAndroidMessagesOutline";
import MaterialSymbolsCastleOutline from "@/public/icons/MaterialSymbolsCastleOutline";
import MaterialSymbolsChessOutline from "@/public/icons/MaterialSymbolsChessOutline";
import MaterialSymbolsGroupOutline from "@/public/icons/MaterialSymbolsGroupOutline";
import MaterialSymbolsNoteStackOutline from "@/public/icons/MaterialSymbolsNoteStackOutline";
import MaterialSymbolsPersonPlayOutline from "@/public/icons/MaterialSymbolsPersonPlayOutline";
import MaterialSymbolsScheduleOutline from "@/public/icons/MaterialSymbolsScheduleOutline";
import RiPushpinLine from "@/public/icons/RiPushpinLine";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IconLinkProps {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
}

const IconLink: React.FC<IconLinkProps> = ({ href, icon: Icon, isActive }) => {
  return (
    <Link href={href}>
      <div
        className={`group cursor-pointer ${isActive ? "text-accent dark:text-green-500" : ""}`}
      >
        <Icon className="h-7 w-7 opacity-60 hover:opacity-100" />
      </div>
    </Link>
  );
};
const TopMenu = ({
  serverId,
  setShowMembers,
}: {
  serverId: string;
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  return (
    <nav className="bg-color-dark collapse relative flex h-0 w-full justify-center overflow-hidden px-6 py-4 lg:visible lg:h-[3.5rem] lg:overflow-visible">
      <div className="flex items-center justify-center space-x-4">
        {/* Left icons */}
        <IconLink
          href={`/server/${serverId}`}
          icon={MaterialSymbolsCastleOutline}
          isActive={pathname === `/server/${serverId}`}
        />
        <IconLink
          href={`/server/${serverId}/chat`}
          icon={MaterialSymbolsAndroidMessagesOutline}
          isActive={pathname.includes("chat")}
        />
        <IconLink
          href={`/server/${serverId}/characters`}
          icon={MaterialSymbolsPersonPlayOutline}
          isActive={pathname.includes("characters")}
        />
        <IconLink
          href={`/server/${serverId}/boards`}
          icon={MaterialSymbolsChessOutline}
          isActive={pathname.includes("boards")}
        />
        <IconLink
          href={`/server/${serverId}/notes`}
          icon={MaterialSymbolsNoteStackOutline}
          isActive={pathname.includes("notes")}
        />
        <IconLink
          href={`/server/${serverId}/dice`}
          icon={IconoirHexagonDice}
          isActive={pathname.includes("dice")}
        />
        <IconLink
          href={`/server/${serverId}/worldclock`}
          icon={MaterialSymbolsScheduleOutline}
          isActive={pathname.includes("worldclock")}
        />
      </div>
      <div className="absolute right-4 flex items-center space-x-4">
        {/* Right icons */}
        <RiPushpinLine className="h-7 w-7 opacity-60 hover:opacity-100" />
        <MaterialSymbolsGroupOutline
          className="h-7 w-7 cursor-pointer opacity-60 hover:opacity-100"
          onClick={() => setShowMembers((prev) => !prev)}
        />
      </div>
    </nav>
  );
};

export default TopMenu;
