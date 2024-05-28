"use client";

import "@/styles/gamePiece.css";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import CharacterCarousel from "./CharacterCarousel";
import { useEffect, useState, useTransition } from "react";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import GamePiece from "../GamePiece";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import Button from "@/app/_components/Button";
import { useRouter } from "next/navigation";
import errorHandler from "@/utils/errorHandler";
import createPiece from "@/actions/gameBoardManagement/createPiece";
import editPiece from "@/actions/gameBoardManagement/editPiece";

export default function GamePieceCreator({
  characters,
  existing,
  board_id,
}: {
  board_id: string;
  existing: GamePiece[];
  characters: ServerCharacter[];
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [carouselCharacters, setCarouselCharacters] = useState(
    filterCarouselCharacters(startIndex),
  );

  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [charaPiece, setCharapiece] = useState<GamePiece>();

  const [style, setStyle] = useState(0);
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    const piece = existing.find(
      (item) => item.character_id === selectedCharacter.id,
    );
    setCharapiece(piece);

    if (piece) {
      setStyle(piece.style);
      setColor(piece.color);
    }
  }, [charaPiece, existing, selectedCharacter.id]);

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
    <RowWrapper breakPoint="md" className="w-full justify-between px-4">
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
              if (charaPiece) {
                await editPiece(charaPiece.id, style, color);
              } else {
                await createPiece(
                  board_id,
                  selectedCharacter.id,
                  selectedCharacter.base.owner_id,
                  style,
                );
              }
            });

            if (!error) {
              router.refresh();
            }
          });
        }}
      >
        {existing ? "Update" : "Add to board"}
      </Button>
      <ColumnWrapper>
        <RowWrapper className="px-2">
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
        <input
          type="color"
          value={color}
          onChange={(e) => {
            console.log(e.target.value);
            setColor(e.target.value);
          }}
        />
      </ColumnWrapper>
    </RowWrapper>
  );
}
