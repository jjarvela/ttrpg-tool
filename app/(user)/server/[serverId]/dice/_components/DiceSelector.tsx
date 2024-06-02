"use client";

import MaterialSymbolsLightCloseRounded from "@/public/icons/MaterialSymbolsLightCloseRounded";
import ColumnWrapper from "../../../../../_components/wrappers/ColumnWrapper";
import RowWrapper from "../../../../../_components/wrappers/RowWrapper";
import Button from "../../../../../_components/Button";
import { twMerge } from "tailwind-merge";
import { RocknRoll_One } from "next/font/google";
import { socket } from "@/socket";
import { useRouter } from "next/navigation";
import type { diceObject, diceSet } from '@/global';
import { Children, Component, MouseEventHandler, useState } from 'react';
import { Dice } from "./Dice";
import { map } from "zod";
/** 
 * This component presents dice selection dialog and intrepret the selection into 
 * dice notation that is sent to the server for the actual roll.
 * 
*/



export default function DiceSelector() {
  const [selectedDices, setDiceSet] = useState<string[]>([]);

  function onClickHandler({ diceType }: diceObject): void {

    console.log("handler reched");
    setDiceSet([...selectedDices, diceType]);

    console.log(`added dicetype ${diceType} to state`);


  }



  return (
    <div className="grid gap-6 grid-cols-8 grid-rows-2" id="diceBox" >
      <Dice diceType="d4" eventHandler={onClickHandler} />
      <Dice diceType="d6" eventHandler={onClickHandler} />
      <Dice diceType="d8" eventHandler={onClickHandler} />
      <Dice diceType="d10" eventHandler={onClickHandler} />
      <Dice diceType="d12" eventHandler={onClickHandler} />
      <Dice diceType="d20" eventHandler={onClickHandler} />
      <div className="grid-row" id="result">
        {selectedDices.toString()}
      </div>
    </div>

  )
}