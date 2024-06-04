"use client";
import "@/styles/boardZoom.css";

import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { useContext } from "react";
import { boardContext, BoardContext } from "./BoardContextWrapper";

export default function ZoomInput() {
  const { zoomLevel, setZoomLevel } = useContext(boardContext) as BoardContext;
  return (
    <ColumnWrapper className="absolute right-0 top-16 z-50">
      <input
        className="board-zoom"
        type="range"
        value={zoomLevel}
        onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
        step={0.25}
        min={0.5}
        max={2.0}
      />
      <span>{Math.floor(zoomLevel * 10) / 10}x</span>
    </ColumnWrapper>
  );
}
