"use client";
import { Fragment, useRef } from "react";
import DiceSelector from "../../../(dice)/_components/DiceSelector";
import IconoirHexagonDice from "@/public/icons/IconoirHexagonDice";

export default function OpenDiceModal({
  channelId,
  serverId,
}: {
  channelId: string;
  serverId: string;
}) {
  const diceRef = useRef<HTMLDialogElement>(null);

  return (
    <Fragment>
      <IconoirHexagonDice
        className="w-[40px] flex-shrink-0 cursor-pointer text-2xl"
        onClick={() => diceRef.current?.showModal()}
      />
      <DiceSelector
        refObject={diceRef}
        channelId={channelId}
        serverId={serverId}
      />
    </Fragment>
  );
}
