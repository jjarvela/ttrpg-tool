"use client";
import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Note } from "./note";
import Main from "@/app/_components/wrappers/PageMain";

interface NoteData {
  id: string;
  content: string;
  position: {
    x: number;
    y: number;
  };
}

const notesData: NoteData[] = [
  {
    id: "1",
    content: "The left path still need to be explored",
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: "2",
    content: "The left path still need to be explored",
    position: {
      x: 0,
      y: 0,
    },
  },
];

export default function ServerNotes() {
  const [notes, setNotes] = useState<NoteData[]>(notesData);

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
    <Main className="mx-4">
      <DndContext onDragEnd={handleDragEnd}>
        {notes.map((note) => (
          <Note
            styles={{
              position: "absolute",
              left: `${note.position.x}px`,
              top: `${note.position.y}px`,
            }}
            key={note.id}
            id={note.id}
            content={note.content}
          />
        ))}
      </DndContext>
    </Main>
  );
}
