import Image from 'next/image'

interface Dice {
  DiceType: "d4" | "d6" | "d8" | "d10" | "d12" | "d20",

}

export function Dice({ DiceType }: Dice) {

  function clickHandler() {

    console.log(`Dice type ${DiceType} was clicked!`)

  }
  return (
    <Image src={`/icons/dices/${DiceType}_light.svg`} onClick={clickHandler} width="100" height="100" alt={`dice_${DiceType}`} />
  )
}

