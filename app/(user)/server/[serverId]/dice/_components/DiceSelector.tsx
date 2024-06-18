'use client';
import { ReactElement, ReactNode, useEffect, useRef } from "react";

import { useState } from "react";
import { Dice, SelectedDices } from "./Dice";
import { DiceRoller } from "dice-roller-parser";
import ConfirmModal from "@/app/_components/ConfirmModal";
import { useSearchParams } from 'next/navigation'
import { RollResult, sendRollAnnouncement } from "@/actions/diceRollActions/diceRoll";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

/** 
 * This component presents dice selection dialog and intrepret the selection into 
 * dice notation that is sent to the server for the actual roll.
 * 
*/



export default function DiceSelector({ params }: Params) {
  const [selectedDices, setDiceSet] = useState<diceSet>([]);
  const [throwResult, setResult] = useState<number>();
  const modalRef = useRef<HTMLDialogElement>(null);
  const urlQuery = useSearchParams();


  useEffect(() => {
    if (!modalRef.current?.open) {
      modalRef.current?.showModal();
    }
  })

  function onClickHandler({ diceType }: diceObject): void {
    if (selectedDices.length < 18) {
      setDiceSet([...selectedDices, diceType]);
    }


  }
  function onRemoveHandler(diceIndex: number): void {

    setDiceSet(
      selectedDices.filter((value: string, index: number) => {
        return index !== diceIndex;
      }
      )
    )
  }

  function onConfirm(selectedDices: diceSet) {

    const rollString = selectedDices.toString();
    const diceRoller = new DiceRoller();
    let rollObject

    if (rollString.includes(",")) {
      rollObject = diceRoller.roll(rollString.replaceAll(",", '+'))
      console.log(rollObject)
    } else {
      rollObject = diceRoller.roll(rollString)
      console.log(rollObject)
    }

    const channelId = urlQuery.get("channel");
    // const serverId = urlQuery

    if (rollObject && channelId) {

      sendRollAnnouncement(rollObject as RollResult, channelId, params.serverId as string)
    }

    setResult(rollObject?.value);


  }


  return (
    <ConfirmModal refObject={modalRef} title="Dice Selector" backOnClose={true} onConfirm={() => onConfirm(selectedDices)} confirmText="Throw!">
      <div className="container p-2 justify-center">
        <div className="grid p-2 gap-4 grid-cols-3 grid-rows-2" id="diceBox" >
          <Dice diceType="d4" eventHandler={onClickHandler} />
          <Dice diceType="d6" eventHandler={onClickHandler} />
          <Dice diceType="d8" eventHandler={onClickHandler} />
          <Dice diceType="d10" eventHandler={onClickHandler} />
          <Dice diceType="d12" eventHandler={onClickHandler} />
          <Dice diceType="d20" eventHandler={onClickHandler} />
        </div>
        <div className="pt-12 grid justify-items-center gap-3 grid-rows-1 grid-cols-6 grid-flow-row" id="selectedDice">
          <SelectedDices members={selectedDices} eventHandler={onRemoveHandler} />
        </div>
        <div className="flex pt-8 w-auto justify-center font-black">
          <div>{throwResult}</div>
        </div>

      </div>
    </ConfirmModal>
  )
}