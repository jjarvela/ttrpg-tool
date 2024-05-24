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

export default function BoardFrame({ board }: { board: GameBoard }) {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const { setNodeRef } = useDroppable({ id: "game-pieces" });

  function handleDragEnd(event: DragEndEvent) {
    const pieceId = event.active.id;
    const delta = event.delta;
  }
  return (
    <DndContext
      id={board.id}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      modifiers={[restrictToParentElement]}
    >
      <div className="scrollbar-thin h-full w-full overflow-auto">
        <div
          ref={setNodeRef}
          style={{
            width: board.width,
            height: board.height,
            background: board.background || "#ad9372",
          }}
        ></div>
      </div>
    </DndContext>
  );
}
