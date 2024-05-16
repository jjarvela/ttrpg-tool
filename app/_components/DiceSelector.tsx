"use client";

import MaterialSymbolsLightCloseRounded from "@/public/icons/MaterialSymbolsLightCloseRounded";
import ColumnWrapper from "./wrappers/ColumnWrapper";
import RowWrapper from "./wrappers/RowWrapper";
import { useState } from 'react';
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import { RocknRoll_One } from "next/font/google";

/** 
 * This component presents dice selection dialog and intrepret the selection into 
 * dice notation that is sent to the server for the actual roll.
 * 
*/

export default function DiceSelector() {
  return (
    <div id="diceBox">

    </div>
  )
}