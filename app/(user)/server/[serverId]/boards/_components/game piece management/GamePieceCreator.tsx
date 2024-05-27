"use client";

import "@/styles/gamePiece.css";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import CharacterCarousel from "./CharacterCarousel";
import { useState, useTransition } from "react";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import GamePiece from "../GamePiece";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import Button from "@/app/_components/Button";
import { useRouter } from "next/navigation";
import errorHandler from "@/utils/errorHandler";
import createPiece from "@/actions/gameBoardManagement/createPiece";

export default function GamePieceCreator({
  characters,
  board_id,
}: {
  board_id: string;
  characters: ServerCharacter[];
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [carouselCharacters, setCarouselCharacters] = useState(
    filterCarouselCharacters(startIndex),
  );

  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [style, setStyle] = useState(0);

  function filterCarouselCharacters(filterIndex: number): ServerCharacter[] {
    const filtered = characters.filter(
      (_character, index) => index >= filterIndex && index <= filterIndex + 2,
    );
    return filtered;
  }

  function changeStartIndex(direction: number) {
    const newIndex = startIndex + direction;
    setStartIndex(newIndex);
    setCarouselCharacters(filterCarouselCharacters(newIndex));
  }

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  return (
    <RowWrapper className="w-full justify-between px-4">
      <CharacterCarousel
        characters={carouselCharacters}
        index={startIndex}
        filterCharacters={changeStartIndex}
        selectedCharacter={selectedCharacter}
        setSelectedCharacter={setSelectedCharacter}
      />
      <Button
        className="btn-primary"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const error: string | null = await errorHandler(async () => {
              await createPiece(
                board_id,
                selectedCharacter.id,
                selectedCharacter.base.owner_id,
                style,
              );
            });

            if (!error) {
              router.refresh();
            }
          });
        }}
      >
        Add to board
      </Button>
      <ColumnWrapper>
        <RowWrapper>
          <MaterialSymbolsLightChevronLeftRounded
            className="flex-shrink-0 cursor-pointer text-2xl"
            onClick={() => {
              if (style > 0) {
                setStyle((prev) => prev - 1);
              } else {
                setStyle(2);
              }
            }}
          />
          <GamePiece character={selectedCharacter} style={style} />
          <MaterialSymbolsLightChevronLeftRounded
            className="flex-shrink-0 rotate-180 cursor-pointer text-2xl"
            onClick={() => {
              if (style < 2) {
                setStyle((prev) => prev + 1);
              } else {
                setStyle(0);
              }
            }}
          />
        </RowWrapper>
        <input type="color" />
      </ColumnWrapper>
    </RowWrapper>
  );
}
