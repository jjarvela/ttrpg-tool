import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";

const CustomStyle = {
  display: "flex",
  width: "140px",
  height: "140px",
  backgroundColor: "#65AE45",
};

export function Note({
  id,
  content,
  styles,
}: {
  id: string;
  content: ReactNode;
  styles?: React.CSSProperties;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...CustomStyle, ...styles }}
      {...listeners}
      {...attributes}
    >
      {content}
    </div>
  );
}
