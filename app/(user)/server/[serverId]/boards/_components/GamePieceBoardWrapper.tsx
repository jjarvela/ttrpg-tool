"use client";

import { useDraggable } from "@dnd-kit/core";
import { useEffect } from "react";

export default function GamePieceBoardWrapper({
  children,
  piece,
  float,
}: {
  children: React.ReactNode;
  piece: GamePiece;
  float: { left: string; top: string };
}) {
  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id: piece.id,
  });

  useEffect(() => {
    if (!transform) return;
    const newPositionX = piece.position_x! + transform.x;
    const newPositionY = piece.position_y! + transform.y;
    // Ensure that the update only happens if there's an actual change in position
  }, [transform, piece.position_x, piece.position_y]);

  const style: React.CSSProperties = {
    position: "absolute",
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    ...float,
  };

  return (
    <div style={style} ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
