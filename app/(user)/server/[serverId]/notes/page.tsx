"use client";
import React, { useId, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { Note } from "./_components/note";
import Main from "@/app/_components/wrappers/PageMain";

interface NoteData {
  id: string;
  author: string;
  content: string;
  position: {
    x: number;
    y: number;
  };
}

const notesData: NoteData[] = [
  {
    id: "1",
    author: "John Doe",
    content:
      "The left path still needs to The left path still needs to The left path still needs to The left path still needs to ",
    position: {
      x: 300,
      y: 100,
    },
  },
  {
    id: "2",
    author: "Dickerson",
    content: "The left path still needs to be explored",
    position: {
      x: 500,
      y: 200,
    },
  },
];

const style = {
  width: "1000px",
  height: "1000px",
};

export default function ServerNotes() {
  const { setNodeRef } = useDroppable({ id: "notes" });
  const [notes, setNotes] = useState<NoteData[]>(notesData);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  // const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor);

  const dndId = useId();

  function handleDragEnd(event: DragEndEvent) {
    const note = notes.find((x) => x.id === event.active.id);
    if (note) {
      note.position.x += event.delta.x;
      note.position.y += event.delta.y;
      const updatedNotes = notes.map((x) => (x.id === note.id ? note : x));
      setNotes(updatedNotes);
    }
  }

  return (
    <Main className="m-0">
      <DndContext
        id={dndId}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        modifiers={[restrictToParentElement]}
      >
        <div
          className="scrollbar-thin h-[95vh] w-[74vw] overflow-auto md:h-[90vh] lg:w-[88vw]"
          style={{ backgroundColor: "transparent" }}
        >
          <div ref={setNodeRef} style={style}>
            {notes.map((note) => (
              <Note
                styles={{
                  position: "relative",
                  left: `${note.position.x}px`,
                  top: `${note.position.y}px`,
                }}
                key={note.id}
                id={note.id}
                author={note.author}
                content={note.content}
              />
            ))}
          </div>
        </div>
      </DndContext>
    </Main>
  );
}
