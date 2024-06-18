"use client";

import { useState } from "react";
import { Dice, SelectedDices } from "./Dice";
import { DiceRoller } from "dice-roller-parser";
import ConfirmModal from "@/app/_components/ConfirmModal";
import { useRouter } from "next/navigation";
import {
  RollResult,
  sendRollAnnouncement,
} from "@/actions/diceRollActions/diceRoll";

/**
 * This component presents dice selection dialog and intrepret the selection into
 * dice notation that is sent to the server for the actual roll.
 *
 */

export default function DiceSelector({
  refObject,
  channelId,
  serverId,
}: {
  refObject: React.RefObject<HTMLDialogElement>;
  channelId: string;
  serverId: string;
}) {
  const [selectedDices, setDiceSet] = useState<diceSet>([]);
  const [throwResult, setResult] = useState<number>();

  const router = useRouter();

  function onClickHandler({ diceType }: diceObject): void {
    if (selectedDices.length < 18) {
      setDiceSet([...selectedDices, diceType]);
    }
  }
  function onRemoveHandler(diceIndex: number): void {
    setDiceSet(
      selectedDices.filter((value: string, index: number) => {
        return index !== diceIndex;
      }),
    );
  }

  function onConfirm(selectedDices: diceSet) {
    const rollString = selectedDices.toString();
    const diceRoller = new DiceRoller();
    const rollObject = diceRoller.roll(rollString.replaceAll(",", "+"));

    if (rollObject && channelId) {
      sendRollAnnouncement(rollObject as RollResult, channelId!, serverId!);
    }

    setResult(rollObject?.value);
    router.refresh();
  }

  return (
    <ConfirmModal
      refObject={refObject}
      title="Dice Selector"
      onConfirm={() => onConfirm(selectedDices)}
      confirmText="Throw!"
    >
      <div className="container justify-center p-2">
        <div className="grid grid-cols-3 grid-rows-2 gap-4 p-2" id="diceBox">
          <Dice diceType="d4" eventHandler={onClickHandler} />
          <Dice diceType="d6" eventHandler={onClickHandler} />
          <Dice diceType="d8" eventHandler={onClickHandler} />
          <Dice diceType="d10" eventHandler={onClickHandler} />
          <Dice diceType="d12" eventHandler={onClickHandler} />
          <Dice diceType="d20" eventHandler={onClickHandler} />
        </div>
        <div
          className="grid grid-flow-row grid-cols-6 grid-rows-1 justify-items-center gap-3 pt-12"
          id="selectedDice"
        >
          <SelectedDices
            members={selectedDices}
            eventHandler={onRemoveHandler}
          />
        </div>
        <div className="flex w-auto justify-center pt-8 font-black">
          <div>{throwResult}</div>
        </div>
      </div>
    </ConfirmModal>
  );
}
