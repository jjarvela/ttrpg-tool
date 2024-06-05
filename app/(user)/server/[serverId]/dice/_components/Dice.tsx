import type { diceObject, diceSet } from '@/global';
import Image from 'next/image'
import { useState, useContext } from 'react'
import React from 'react';
import { string } from 'zod';

interface IDiceProps {
  diceType: diceObject["diceType"],
  eventHandler: Function

}

interface IDiceSet {
  members: diceSet,
  eventHandler: Function
}

export function Dice({ diceType, eventHandler }: IDiceProps) {
  return (
    <Image src={`/icons/dices/${diceType}.svg`} onClick={() => eventHandler({ diceType })} width="100" height="100" alt={`dice_${diceType}`} />
  )
}

export function SelectedDices({ members, eventHandler }: IDiceSet) {


  return (
    members.map((dice, diceIndex) =>
      <Image key={diceIndex} src={`/icons/dices/${dice}_light.svg`} onClick={() => eventHandler(diceIndex)} width="50" height="50" alt={`dice_${dice}`} />
    )
  );
}

