"use client";

import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { GameBoard } from "@prisma/client";
import GamePiece from "./GamePiece";
import { useCallback, useEffect, useState } from "react";
import { socket } from "@/socket";
import movePiece from "@/actions/gameBoardManagement/movePiece";
import GamePieceBoardWrapper from "./GamePieceBoardWrapper";

export default function BoardFrame({
  currentUser,
  board,
  pieces,
  imageUrl,
}: {
  currentUser: string;
  board: GameBoard;
  pieces: GamePiece[];
  imageUrl?: string;
}) {
  const [gamePieces, setPieces] = useState(pieces);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    socket.emit("join-board", board.id);
  }, [board]);

  useEffect(() => {
    socket.on("add-piece", (piece) => {
      console.log(piece);
      const newPieces = [...gamePieces, piece];
      setPieces(newPieces);
    });

    socket.on("update-piece", (piece) => {
      const filtered = gamePieces.filter((item) => item.id !== piece.id);
      setPieces([...filtered, piece]);
    });

    socket.on("delete-piece", (piece_id) => {
      const filtered = gamePieces.filter((item) => item.id !== piece_id);
      setPieces(filtered);
    });

    return () => {
      socket.off("add-piece");
      socket.off("update-piece");
      socket.off("delete-piece");
    };
  });

  const { setNodeRef } = useDroppable({ id: "game-pieces" });

  const handlePositionChange = useCallback(
    async (piece_id: string, newPositionX: number, newPositionY: number) => {
      try {
        const piece = await movePiece(piece_id, newPositionX, newPositionY);

        // After updating the database, emit the updated note via socket
        socket.emit("update-piece", {
          piece_id: piece.id,
          board_id: board.id,
        });
      } catch (error) {
        console.error("Error updating note position:", error);
      }
    },
    [board],
  );

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const piece_id = event.active.id;
      const delta = event.delta;

      // Find the piece based on id
      const piece = gamePieces.find((item) => item.id === piece_id);
      if (!piece) {
        console.error("Piece not found:", piece_id);
        return;
      }

      const newPositionX = piece.position_x
        ? piece.position_x + delta.x
        : delta.x;
      const newPositionY = piece.position_y
        ? piece.position_y + delta.y
        : delta.y;

      // Update the piece's position in the local state
      setPieces((prev) =>
        prev.map((item) => {
          return item.id === piece_id
            ? { ...item, position_x: newPositionX, position_y: newPositionY }
            : item;
        }),
      );
      handlePositionChange(piece.id, newPositionX, newPositionY);
    },
    [gamePieces, handlePositionChange],
  );

  return (
    <DndContext
      id={board.id}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      modifiers={[restrictToParentElement]}
    >
      <div className="scrollbar-thin max-h-full w-full flex-grow overflow-auto">
        <div
          ref={setNodeRef}
          style={{
            position: "relative",
            width: board.width,
            height: board.height,
            background: imageUrl ? `url(${imageUrl})` : "#ad9372",
          }}
        >
          {gamePieces.map((piece) => {
            return (
              <GamePieceBoardWrapper
                isOwn={currentUser === piece.user_id}
                key={piece.id}
                piece={piece}
                float={{
                  left: `${piece.position_x}px`,
                  top: `${piece.position_y}px`,
                }}
              >
                <GamePiece
                  character={piece.character}
                  style={piece.style}
                  hoverEffect={true}
                />
              </GamePieceBoardWrapper>
            );
          })}
        </div>
      </div>
    </DndContext>
  );
}
