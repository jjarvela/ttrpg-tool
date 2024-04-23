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
import { v4 as uuidV4 } from "uuid";

interface NoteData {
  id: string;
  author: string;
  documentName: string;
  appId: string;
  token: string;
  position: {
    x: number;
    y: number;
  };
}

const token = process.env.NEXT_PUBLIC_TIPTAP_TOKEN || "default_token";
const appId = process.env.NEXT_PUBLIC_TIPTAP_APPID || "default_app_id";

const style = {
  width: "1000px",
  height: "1000px",
};

const mockNotes: NoteData[] = [
  {
    id: "1",
    author: "John Doe",
    position: {
      x: 300,
      y: 100,
    },
    documentName: "John",
    appId: appId,
    token: token,
  },
  {
    id: "2",
    author: "Dickerson",
    position: {
      x: 500,
      y: 200,
    },
    documentName: "Dick",
    appId: appId,
    token: token,
  },
];

export default function ServerNotes() {
  const { setNodeRef } = useDroppable({ id: "notes" });
  const [notes, setNotes] = useState<NoteData[]>(mockNotes);

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

  function handleNewNote() {
    const newDocumentName = uuidV4();
    const newNote: NoteData = {
      id: uuidV4(), // generate a unique id for the new note
      author: "Anonymous",
      documentName: newDocumentName, // Unique document name for each note
      appId: appId,
      token: token,
      position: {
        x: 200,
        y: 200,
      },
    };
    setNotes([...notes, newNote]);
  }

  return (
    <Main className="m-0">
      <div className="mb-4 flex justify-center">
        <button onClick={handleNewNote} className="btn btn-primary">
          New Note
        </button>
      </div>
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
                documentName={note.documentName} // Pass the documentName from note
                appId={note.appId} // Pass the appId from note
                token={note.token} // Pass the token from note
              />
            ))}
          </div>
        </div>
      </DndContext>
    </Main>
  );
}
