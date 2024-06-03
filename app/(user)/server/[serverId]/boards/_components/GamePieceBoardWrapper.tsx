"use client";

import { useDraggable } from "@dnd-kit/core";
import { useContext, useEffect } from "react";
import { BoardContext, boardContext } from "./BoardContextWrapper";

export default function GamePieceBoardWrapper({
  isOwn,
  children,
  piece,
  float,
  zoomLevel,
}: {
  isOwn: boolean;
  children: React.ReactNode;
  piece: GamePiece;
  float: { left: string; top: string };
  zoomLevel: number;
}) {
  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id: piece.id,
  });

  useEffect(() => {
    if (!transform) return;
    const newPositionX = piece.position_x! + transform.x / zoomLevel;
    const newPositionY = piece.position_y! + transform.y / zoomLevel;
    // Ensure that the update only happens if there's an actual change in position
  }, [transform, piece.position_x, piece.position_y, zoomLevel]);

  const style: React.CSSProperties = {
    position: "absolute",
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    ...float,
  };

  if (isOwn) {
    return (
      <div style={style} ref={setNodeRef} {...listeners} {...attributes}>
        {children}
      </div>
    );
  }

  return (
    <div style={style} ref={setNodeRef}>
      {children}
    </div>
  );
}
