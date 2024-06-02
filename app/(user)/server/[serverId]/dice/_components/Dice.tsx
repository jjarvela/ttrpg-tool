import type { diceObject, diceSet } from '@/global';
import Image from 'next/image'
import { useState, useContext } from 'react'
import React from 'react';

export function Dice({ diceType, eventHandler }: diceObject) {
  return (
    <Image src={`/icons/dices/${diceType}_light.svg`} onClick={() => eventHandler({ diceType })} width="100" height="100" alt={`dice_${diceType}`} />
  )
}

