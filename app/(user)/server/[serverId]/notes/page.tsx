"use client";
import React, { Key, useEffect, useId, useState } from "react";
import { io } from "socket.io-client";
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
import handleNewNote from "@/actions/notesManagement/handleNewNote";
import handleGetAllNotes from "@/actions/notesManagement/handleGetAllNotes";

export interface NoteData {
  id: string;
  author: string;
  documentName: string;
  positionX: number;
  positionY: number;
  content: string;
}

// const token = process.env.NEXT_PUBLIC_TIPTAP_TOKEN || "default_token";
// const appId = process.env.NEXT_PUBLIC_TIPTAP_APPID || "default_app_id";

const dropAreaSize = {
  width: "1000px",
  height: "1000px",
};

const socket = io();

export default function ServerNotes() {
  const { setNodeRef } = useDroppable({ id: "notes" });
  const [notes, setNotes] = useState<NoteData[]>([]);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);
  const dndId = useId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetAllNotes(); // Call handleGetAllNotes to fetch notes
        setNotes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(notes);
  useEffect(() => {
    socket.on("update-note", (updatedNote) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.documentName === updatedNote.name ? updatedNote : note,
        ),
      );
    });

    return () => {
      socket.off("update-note");
    };
  }, []);

  async function handleNewNoteClient() {
    try {
      const newNote = await handleNewNote(); // Call server-side function directly
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error("Error creating note:", error);
      setError("Error creating note");
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const noteId = event.active.id;
    const delta = event.delta;

    const updatedNote = notes.find((note) => note.id === noteId);
    if (updatedNote) {
      updatedNote.positionX += delta.x;
      updatedNote.positionY += delta.y;

      setNotes([...notes]);

      socket.emit("update-note", updatedNote);
    }
  }

  return (
    <Main className="m-0">
      <div className="mb-4 flex justify-center">
        <button onClick={handleNewNoteClient} className="btn btn-primary">
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
          <div ref={setNodeRef} style={dropAreaSize}>
            {notes.map((note) => (
              <Note
                styles={{
                  position: "absolute",
                  left: `${note.positionX}px`,
                  top: `${note.positionY}px`,
                }}
                key={note.documentName}
                author={note.author}
                documentName={note.documentName || ""}
                id={note.documentName || ""}
                note={note}
              />
            ))}
          </div>
        </div>
      </DndContext>
    </Main>
  );
}
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}
