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
  content: string;
  documentName: string;
  appId: string;
  token: string;
  position: {
    x: number;
    y: number;
  };
}

const style = {
  width: "1000px",
  height: "1000px",
};

export default function ServerNotes() {
  const { setNodeRef } = useDroppable({ id: "notes" });
  const [notes, setNotes] = useState<any[]>([]);

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
      content: "New note content",
      appId: "7MELDG9Y",
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTM3NzY3NjgsIm5iZiI6MTcxMzc3Njc2OCwiZXhwIjoxNzEzODYzMTY4LCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiI3bWVsZGc5eSJ9.Z4KEsp2e8CHOFe9hBUsJcJku-c-cp1Tapqmhq7uROAE",
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
                content={note.content}
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
