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

  return (
    <Link href={href}>
      <div
        className={`group cursor-pointer ${pathname === href ? "text-green-500" : ""}`}
      >
        <Icon className="h-7 w-7 opacity-60 hover:opacity-100 active:stroke-primary" />
      </div>
    </Link>
  );
};
const TopMenu = () => {
  return (
    <nav className="relative hidden lg:block">
      <div className="bg-color-dark absolute left-0 right-0 top-0 flex justify-center px-6 py-4">
        <div className="flex items-center justify-center space-x-4">
          {/* Left icons */}
          <IconLink href="/server" icon={MaterialSymbolsCastleOutline} />
          <IconLink href="/chat" icon={MaterialSymbolsAndroidMessagesOutline} />
          <IconLink
            href="/characters"
            icon={MaterialSymbolsPersonPlayOutline}
          />
          <IconLink href="/boards" icon={MaterialSymbolsChessOutline} />
          <IconLink href="/notes" icon={MaterialSymbolsNoteStackOutline} />
          <IconLink href="/dice" icon={IconoirHexagonDice} />
          <IconLink href="/worldclock" icon={MaterialSymbolsScheduleOutline} />
        </div>
        <div className="absolute right-44 flex items-center space-x-4">
          {/* Right icons */}
          <IconLink href="/pinned" icon={RiPushpinLine} />
          <IconLink href="/friends" icon={MaterialSymbolsGroupOutline} />
        </div>
      </div>
    </nav>
  );
};

export default TopMenu;
