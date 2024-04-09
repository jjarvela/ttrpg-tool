"use client";
import Link from "next/link";
import IconoirHexagonDice from "../../public/icons/IconoirHexagonDice";
import MaterialSymbolsAndroidMessagesOutline from "../../public/icons/MaterialSymbolsAndroidMessagesOutline";
import MaterialSymbolsCastleOutline from "../../public/icons/MaterialSymbolsCastleOutline";
import MaterialSymbolsChessOutline from "../../public/icons/MaterialSymbolsChessOutline";
import MaterialSymbolsGroupOutline from "../../public/icons/MaterialSymbolsGroupOutline";
import MaterialSymbolsNoteStackOutline from "../../public/icons/MaterialSymbolsNoteStackOutline";
import MaterialSymbolsPersonPlayOutline from "../../public/icons/MaterialSymbolsPersonPlayOutline";
import MaterialSymbolsScheduleOutline from "../../public/icons/MaterialSymbolsScheduleOutline";
import RiPushpinLine from "../../public/icons/RiPushpinLine";
import { usePathname } from "next/navigation";

interface IconLinkProps {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const IconLink: React.FC<IconLinkProps> = ({ href, icon: Icon }) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

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
const TopMenu = ({ serverId, setShowMembers}: { serverId: string, setShowMembers: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <nav className="bg-color-dark collapse relative flex h-0 w-full justify-center overflow-hidden px-6 py-4 lg:visible lg:h-40 lg:overflow-visible">
      <div className="flex items-center justify-center space-x-4">
        {/* Left icons */}
        <IconLink
          href={`/server/${serverId}`}
          icon={MaterialSymbolsCastleOutline}
        />
        <IconLink
          href={`/server/${serverId}/chat`}
          icon={MaterialSymbolsAndroidMessagesOutline}
        />
        <IconLink
          href={`/server/${serverId}/characters`}
          icon={MaterialSymbolsPersonPlayOutline}
        />
        <IconLink
          href={`/server/${serverId}/boards`}
          icon={MaterialSymbolsChessOutline}
        />
        <IconLink
          href={`/server/${serverId}/notes`}
          icon={MaterialSymbolsNoteStackOutline}
        />
        <IconLink href={`/server/${serverId}/dice`} icon={IconoirHexagonDice} />
        <IconLink
          href={`/server/${serverId}/worldclock`}
          icon={MaterialSymbolsScheduleOutline}
        />
      </div>
      <div className="absolute right-4 flex items-center space-x-4">
        {/* Right icons */}
        <RiPushpinLine className="h-7 w-7 opacity-60 hover:opacity-100" />
        <MaterialSymbolsGroupOutline className="h-7 w-7 cursor-pointer opacity-60 hover:opacity-100" onClick={() => setShowMembers(prev => !prev)}/>
      </div>
    </nav>
  );
};

export default TopMenu;
