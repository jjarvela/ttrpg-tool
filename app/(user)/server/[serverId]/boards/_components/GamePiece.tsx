"use client";

import CharacterPortrait from "@/app/_components/character/CharacterPortraitClient";

export default function GamePiece({
  character,
  style,
}: {
  character: ServerCharacter;
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

  return (
    <div className="relative flex items-center justify-items-center">
      <div className="h-[100px] w-[100px]">
        {character.base.image && (
          <CharacterPortrait
            className={selectStyle(style)}
            filename={character.base.image}
            alt={character.base.name}
          />
        )}
      </div>
    </div>
  );
}
