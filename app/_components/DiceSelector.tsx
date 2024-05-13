"use client";

import MaterialSymbolsLightCloseRounded from "@/public/icons/MaterialSymbolsLightCloseRounded";
import ColumnWrapper from "./wrappers/ColumnWrapper";
import RowWrapper from "./wrappers/RowWrapper";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import { RocknRoll_One } from "next/font/google";

/** 
 * This component presents dice selection dialog and intrepret the selection into 
 * dice notation that is sent to server for the actual roll.
 * 
*/

function DiceSelector() {
  return (
    <div id="diceBox">
      
    </div>
  )
}