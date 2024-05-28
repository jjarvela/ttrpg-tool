"use client";

import CharacterPortrait from "@/app/_components/character/CharacterPortraitClient";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function GamePiece({
  character,
  style,
  hoverEffect,
}: {
  character: {
    class: string;
    level: number;
    base: { name: string; image: string | null };
  };
  hoverEffect?: boolean;
  style: number;
}) {
  function selectStyle(style: number) {
    switch (style) {
      case 1:
        return "diamond-shape";
      case 2:
        return "hexagon-shape";
      default:
        return "circle-shape";
    }
  }

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative flex items-center justify-items-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseDown={() => setIsHovering(false)}
    >
      <div
        className={twMerge(
          "h-[100px] w-[100px] overflow-hidden bg-primary",
          selectStyle(style),
        )}
      >
        {character.base.image && (
          <CharacterPortrait
            filename={character.base.image}
            alt={character.base.name}
          />
        )}
      </div>
      {hoverEffect && isHovering && (
        <ColumnWrapper className="bg-color-dark fixed translate-x-20 translate-y-2 gap-0 rounded-lg">
          <p>{character.base.name}</p>
          <small>
            {character.class}
            <span className="ml-1">Lvl {character.level}</span>
          </small>
        </ColumnWrapper>
      )}
    </div>
  );
}
