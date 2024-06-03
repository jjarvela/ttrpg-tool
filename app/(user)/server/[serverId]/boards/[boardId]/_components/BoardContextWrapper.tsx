"use client";

import { GameBoard } from "@prisma/client";
import { createContext, useState } from "react";

export type BoardContext = {
  board: GameBoard;
  pieceSize: string;
  setPieceSize: React.Dispatch<React.SetStateAction<string>>;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
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
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <boardContext.Provider
      value={{ board, pieceSize, setPieceSize, zoomLevel, setZoomLevel }}
    >
      {children}
    </boardContext.Provider>
  );
}
