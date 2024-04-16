"use client";
import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Note } from "./note";
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
    content: "The left path still needs to be explored",
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

export default function ServerNotes() {
  const [notes, setNotes] = useState<NoteData[]>(notesData);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

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
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        {notes.map((note) => (
          <Note
            styles={{
              position: "absolute",
              left: `${note.position.x}px`,
              top: `${note.position.y}px`,
            }}
            key={note.id}
            id={note.id}
            author={note.author}
            content={note.content}
          />
        ))}
      </DndContext>
    </Main>
  );
}
