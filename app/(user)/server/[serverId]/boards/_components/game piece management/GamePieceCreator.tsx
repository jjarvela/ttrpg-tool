"use client";

import "@/styles/gamePiece.css";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import CharacterCarousel from "./CharacterCarousel";
import { Fragment, useEffect, useState, useTransition } from "react";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import GamePiece from "../GamePiece";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import Button from "@/app/_components/Button";
import { useRouter } from "next/navigation";
import errorHandler from "@/utils/errorHandler";
import createPiece from "@/actions/gameBoardManagement/createPiece";
import editPiece from "@/actions/gameBoardManagement/editPiece";
import { socket } from "@/socket";
import deletePiece from "@/actions/gameBoardManagement/deletePiece";
import { twMerge } from "tailwind-merge";

export default function GamePieceCreator({
  characters,
  existing,
  board_id,
}: {
  board_id: string;
  existing: GamePiece[];
  characters: ServerCharacter[];
}) {
  const [mode, setMode] = useState(1);

  const [startIndex, setStartIndex] = useState(0);
  const [carouselCharacters, setCarouselCharacters] = useState(
    filterCarouselCharacters(startIndex),
  );

  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [charaPiece, setCharapiece] = useState<GamePiece>();

  const [style, setStyle] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#985F2E");
  const [color, setColor] = useState("#985F2E");

  useEffect(() => {
    const piece = existing.find(
      (item) => item.character_id === selectedCharacter.id,
    );
    setCharapiece(piece);

    if (piece) {
      setStyle(piece.style);
      setColor(piece.color);
      setSelectedColor(piece.color);
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

  function carousel() {
    return (
      <CharacterCarousel
        characters={carouselCharacters}
        index={startIndex}
        filterCharacters={changeStartIndex}
        selectedCharacter={selectedCharacter}
        setSelectedCharacter={setSelectedCharacter}
      />
    );
  }

  function creator() {
    return (
      <ColumnWrapper>
        <RowWrapper className="px-2">
          <MaterialSymbolsLightChevronLeftRounded
            className="flex-shrink-0 cursor-pointer text-2xl"
            onClick={() => {
              if (style > 1) {
                setStyle((prev) => prev - 1);
              } else {
                setStyle(3);
              }
            }}
          />
          <GamePiece
            character={selectedCharacter}
            style={style}
            color={color}
          />
          <MaterialSymbolsLightChevronLeftRounded
            className="flex-shrink-0 rotate-180 cursor-pointer text-2xl"
            onClick={() => {
              if (style < 3) {
                setStyle((prev) => prev + 1);
              } else {
                setStyle(1);
              }
            }}
          />
        </RowWrapper>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => {
            setSelectedColor(e.target.value);
          }}
          onBlur={() => setColor(selectedColor)}
        />
      </ColumnWrapper>
    );
  }

  function buttons() {
    return (
      <ColumnWrapper>
        <Button
          className="btn-primary"
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              const error: string | null = await errorHandler(async () => {
                if (charaPiece) {
                  await editPiece(charaPiece.id, style, color);
                  socket.emit("update-piece", {
                    piece_id: charaPiece.id,
                    board_id,
                  });
                  router.refresh();
                } else {
                  const piece = await createPiece(
                    board_id,
                    selectedCharacter.id,
                    selectedCharacter.base.owner_id,
                    style,
                    color,
                  );
                  socket.emit("add-piece", { piece_id: piece.id, board_id });
                  router.refresh();
                }
              });
            });
          }}
        >
          {charaPiece ? "Update" : "Add to board"}
        </Button>
        {charaPiece && (
          <Button
            className="btn-secondary bg-warning"
            onClick={() => {
              errorHandler(async () => {
                await deletePiece(charaPiece.id);
                socket.emit("delete-piece", {
                  piece_id: charaPiece.id,
                  board_id,
                });
                router.refresh();
                return null;
              });
            }}
          >
            Delete from board
          </Button>
        )}
      </ColumnWrapper>
    );
  }

  return (
    <Fragment>
      <RowWrapper className="md:hidden">
        <small
          className={twMerge(
            "hover:bg-color-dark mini-link",
            mode === 1 && "bg-black25 dark:bg-black75",
          )}
          onClick={() => setMode(1)}
        >
          Character
        </small>
        <small
          className={twMerge(
            "hover:bg-color-dark mini-link",
            mode === 2 && "bg-black25 dark:bg-black75",
          )}
          onClick={() => setMode(2)}
        >
          Game Piece
        </small>
      </RowWrapper>
      <ColumnWrapper className="md:hidden">
        {mode === 1 && carousel()}

        {mode === 2 && creator()}
        {mode === 2 && buttons()}
      </ColumnWrapper>
      <RowWrapper className="hidden w-full justify-between px-4 md:flex">
        {carousel()}
        {buttons()}
        {creator()}
      </RowWrapper>
    </Fragment>
  );
}
