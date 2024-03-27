import Fa6SolidDiceD20 from "../../public/icons/Fa6SolidDiceD20";
import IconoirHexagonDice from "../../public/icons/IconoirHexagonDice";
import MaterialSymbolsAndroidMessagesOutline from "../../public/icons/MaterialSymbolsAndroidMessagesOutline";
import MaterialSymbolsCastleOutline from "../../public/icons/MaterialSymbolsCastleOutline";
import MaterialSymbolsChessOutline from "../../public/icons/MaterialSymbolsChessOutline";
import MaterialSymbolsGroupOutline from "../../public/icons/MaterialSymbolsGroupOutline";
import MaterialSymbolsLightCastle from "../../public/icons/MaterialSymbolsLightCastle";
import MaterialSymbolsLightChat from "../../public/icons/MaterialSymbolsLightChat";
import MaterialSymbolsLightChess from "../../public/icons/MaterialSymbolsLightChess";
import MaterialSymbolsLightNoteStack from "../../public/icons/MaterialSymbolsLightNoteStack";
import MaterialSymbolsLightPersonPlay from "../../public/icons/MaterialSymbolsLightPersonPlay";
import MaterialSymbolsLightSchedule from "../../public/icons/MaterialSymbolsLightSchedule";
import MaterialSymbolsNoteStackOutline from "../../public/icons/MaterialSymbolsNoteStackOutline";
import MaterialSymbolsPersonPlayOutline from "../../public/icons/MaterialSymbolsPersonPlayOutline";
import MaterialSymbolsScheduleOutline from "../../public/icons/MaterialSymbolsScheduleOutline";
import RiPushpinLine from "../../public/icons/RiPushpinLine";

const TopMenu = () => {
  return (
    <nav className="relative">
      <div className="bg-color-dark fixed flex w-full items-center justify-between px-6 py-4">
        <div className="ms-14 flex items-center space-x-4">
          {/* Left icons */}
          <MaterialSymbolsCastleOutline className="h-7 w-7" />
          <MaterialSymbolsAndroidMessagesOutline className="h-7 w-7" />
          <MaterialSymbolsPersonPlayOutline className="h-7 w-7" />
          <MaterialSymbolsChessOutline className="h-7 w-7" />
          <MaterialSymbolsNoteStackOutline className="h-7 w-7" />
          <IconoirHexagonDice className="h-7 w-7" />
          <MaterialSymbolsScheduleOutline className="h-7 w-7" />
        </div>
        <div className="flex items-center space-x-4">
          {/* Right icons */}
          <RiPushpinLine className="h-7 w-7" />
          <MaterialSymbolsGroupOutline className="h-7 w-7" />
        </div>
      </div>
    </nav>
  );
};

const Icon: React.FC = () => {
  return <div className="h-8 w-8 rounded-full bg-gray-400"></div>;
};

export default TopMenu;
