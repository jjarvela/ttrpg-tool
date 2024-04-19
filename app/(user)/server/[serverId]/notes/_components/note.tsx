"use client";
import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import TipTapEditor from "./TipTapEditor";
import RadixIconsDragHandleDots2 from "@/public/icons/RadixIconsDragHandleDots2";

const CustomStyle = {
  width: "140px",
  minHeight: "140px",
};

export function Note({
  id,
  author,
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
      className="flex flex-col border border-black50 bg-primary p-1 shadow-xl"
      ref={setNodeRef}
      style={{ ...style, ...CustomStyle, ...styles }}
    >
      <div className="mb-2 flex justify-center text-center">{author}</div>

      <div className="flex-grow">
        <TipTapEditor />
      </div>
      <button className="mb-1 h-4 w-full" {...listeners} {...attributes}>
        <RadixIconsDragHandleDots2 className="mx-auto h-5 w-5" />
      </button>
    </div>
  );
}
