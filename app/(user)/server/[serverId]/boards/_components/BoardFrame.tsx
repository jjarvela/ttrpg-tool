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
import { useCallback, useContext, useEffect, useState } from "react";
import { socket } from "@/socket";
import movePiece from "@/actions/gameBoardManagement/movePiece";
import GamePieceBoardWrapper from "./GamePieceBoardWrapper";
import { BoardContext, boardContext } from "./BoardContextWrapper";
import { z } from "zod";

export default function BoardFrame({
  currentUser,
  pieces,
  imageUrl,
}: {
  currentUser: string;
  pieces: GamePiece[];
  imageUrl?: string;
}) {
  const { board, pieceSize } = useContext(boardContext) as BoardContext;
  const [gamePieces, setPieces] = useState(pieces);
  const [zoomLevel, setZoomLevel] = useState(1);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    socket.emit("join-board", board.id);
  }, [board]);

  useEffect(() => {
    socket.on("add-piece", (piece) => {
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
        console.error("Error updating piece position:", error);
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
        ? piece.position_x + delta.x / zoomLevel
        : delta.x;
      const newPositionY = piece.position_y
        ? piece.position_y + delta.y / zoomLevel
        : delta.y;

      // Update the piece's position in the local state
      setPieces((prev) =>
        prev.map((item) => {
          return item.id === piece_id
            ? {
                ...item,
                position_x: Math.floor(newPositionX),
                position_y: Math.floor(newPositionY),
              }
            : item;
        }),
      );
      handlePositionChange(piece.id, newPositionX, newPositionY);
    },
    [gamePieces, handlePositionChange, zoomLevel],
  );

  function sizePieces() {
    switch (pieceSize) {
      case "sm":
        return 50;
      case "md":
        return 75;
      case "lg":
        return 100;
      default:
        return 100;
    }
  }

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
            width: board.width * zoomLevel,
            height: board.height * zoomLevel,
            background: imageUrl ? `url(${imageUrl})` : "#ad9372",
            backgroundSize: "cover",
          }}
          onWheel={(e) => {
            if (e.deltaY < 0 && zoomLevel < 2) {
              setZoomLevel(zoomLevel + 0.1);
            } else if (e.deltaY > 1 && zoomLevel > 0.5) {
              setZoomLevel(zoomLevel - 0.1);
            } else {
              return;
            }
          }}
        >
          {gamePieces.map((piece) => {
            return (
              <GamePieceBoardWrapper
                isOwn={currentUser === piece.user_id}
                key={piece.id}
                piece={piece}
                float={{
                  left: `${piece.position_x * zoomLevel}px`,
                  top: `${piece.position_y * zoomLevel}px`,
                }}
                zoomLevel={zoomLevel}
              >
                <GamePiece
                  character={piece.character}
                  color={piece.color}
                  style={piece.style}
                  hoverEffect={true}
                  size={sizePieces()}
                />
              </GamePieceBoardWrapper>
            );
          })}
        </div>
      </div>
    </DndContext>
  );
}
