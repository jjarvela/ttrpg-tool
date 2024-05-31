"use client";

import { GameBoard } from "@prisma/client";
import { createContext, useState } from "react";

export type BoardContext = {
  board: GameBoard;
  pieceSize: string;
  setPieceSize: React.Dispatch<React.SetStateAction<string>>;
};

export const boardContext = createContext<BoardContext | null>(null);

export default function BoardContextWrapper({
  board,
  children,
}: {
  board: GameBoard;
  children: React.ReactNode;
}) {
  const [pieceSize, setPieceSize] = useState("lg");

  return (
    <boardContext.Provider value={{ board, pieceSize, setPieceSize }}>
      {children}
    </boardContext.Provider>
  );
}
