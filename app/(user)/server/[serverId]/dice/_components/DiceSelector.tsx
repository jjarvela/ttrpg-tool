'use client';
import { ReactElement, ReactNode, useEffect, useRef } from "react";
import Button from "../../../../../_components/Button";
import type { diceObject, diceSet } from "@/global";
import { useState } from "react";
import { Dice, SelectedDices } from "./Dice";
import ConfirmModal from "@/app/_components/ConfirmModal";
/** 
 * This component presents dice selection dialog and intrepret the selection into 
 * dice notation that is sent to the server for the actual roll.
 * 
*/



export default function DiceSelector() {
  const [selectedDices, setDiceSet] = useState<diceSet>([]);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    console.log("Ikkunan tila " + modalRef.current);
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

    console.log("Received diceSet" + selectedDices);

  }


  return (
    <ConfirmModal refObject={modalRef} title="Dice Selector" onConfirm={() => onConfirm(selectedDices)} confirmText="Throw!">
      <div className="container p-2">
        <div className="grid p-2 gap-4 grid-cols-3 grid-rows-2" id="diceBox" >
          <Dice diceType="d4" eventHandler={onClickHandler} />
          <Dice diceType="d6" eventHandler={onClickHandler} />
          <Dice diceType="d8" eventHandler={onClickHandler} />
          <Dice diceType="d10" eventHandler={onClickHandler} />
          <Dice diceType="d12" eventHandler={onClickHandler} />
          <Dice diceType="d20" eventHandler={onClickHandler} />
        </div>
        <div className="pt-12 grid gap-1 grid-rows-1 grid-cols-6 grid-flow-row" id="selectedDice">
          <SelectedDices members={selectedDices} eventHandler={onRemoveHandler} />
        </div>
      </div>
    </ConfirmModal>
  )
}