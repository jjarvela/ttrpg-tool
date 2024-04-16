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
  author,
  content,
  styles,
}: {
  id: string;
  author: string;
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
      className="flex flex-col rounded border-2 border-black50 p-1 shadow-xl"
      ref={setNodeRef}
      style={{ ...style, ...CustomStyle, ...styles }}
      {...listeners}
      {...attributes}
    >
      <div className="mb-2 flex justify-center text-center">{author}</div>
      <div className="flex">{content}</div>
    </div>
  );
}
