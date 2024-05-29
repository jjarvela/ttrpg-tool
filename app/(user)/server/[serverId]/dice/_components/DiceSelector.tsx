"use client";

import MaterialSymbolsLightCloseRounded from "@/public/icons/MaterialSymbolsLightCloseRounded";
import ColumnWrapper from "../../../../../_components/wrappers/ColumnWrapper";
import RowWrapper from "../../../../../_components/wrappers/RowWrapper";
import { useState } from 'react';
import Button from "../../../../../_components/Button";
import { twMerge } from "tailwind-merge";
import { RocknRoll_One } from "next/font/google";
import { socket } from "@/socket";
import { useRouter } from "next/navigation";
import { Dice } from "./Dice";
/** 
 * This component presents dice selection dialog and intrepret the selection into 
 * dice notation that is sent to the server for the actual roll.
 * 
*/

function requestThrowResult() {

  console.log("throw");

}

export default function DiceSelector() {
  return (
    <div className="grid gap-6 grid-cols-6 grid-rows-1" id="diceBox" >
      <Dice DiceType="d4" />
      <Dice DiceType="d6" />
      <Dice DiceType="d8" />
      <Dice DiceType="d10" />
      <Dice DiceType="d12" />
      <Dice DiceType="d20" />
    </div>
  )
}