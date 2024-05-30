"use client";

import CharacterPortrait from "@/app/_components/character/CharacterPortraitClient";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import FrameStyle1 from "./Frames/FrameStyle1";
import FrameStyle2 from "./Frames/FrameStyle2";
import FrameStyle3 from "./Frames/FrameStyle3";

export default function GamePiece({
  character,
  style,
  color,
  hoverEffect,
}: {
  character: {
    class: string;
    level: number;
    base: { name: string; image: string | null };
  };
  style: number;
  color: string;
  hoverEffect?: boolean;
}) {
  function selectStyle(style: number) {
    if (style.toString().startsWith("1")) {
      return "circle-shape";
    }
    if (style.toString().startsWith("2")) {
      return "diamond-shape";
    }
    if (style.toString().startsWith("3")) {
      return "hexagon-shape";
    }
    return "circle-shape";
  }

  function setFrame(style: number): JSX.Element | null {
    if (style.toString().startsWith("1")) {
      switch (style) {
        case 1:
          return <FrameStyle1 color={color} />;
        default:
          return null;
      }
    }
    if (style.toString().startsWith("2")) {
      switch (style) {
        case 2:
          return <FrameStyle2 color={color} />;
        default:
          return null;
      }
    }
    if (style.toString().startsWith("3")) {
      switch (style) {
        case 3:
          return <FrameStyle3 color={color} />;
        default:
          return null;
      }
    }
    return null;
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
      {setFrame(style)}
      {hoverEffect && isHovering && (
        <ColumnWrapper className="bg-color-dark absolute left-20 top-2 w-max gap-0 rounded-lg">
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
