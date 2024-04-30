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
import { v4 as uuidV4 } from "uuid";
import { getNotes } from "./_components/HandlerFunctions";
import { createNote } from "@/prisma/services/notesService";

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
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  function handleDragEnd(event: DragEndEvent) {
    const noteId = event.active.id;
    const delta = event.delta;

    const updatedNote = notes.find((note) => note.id === noteId);
    if (updatedNote) {
      updatedNote.positionX += delta.x;
      updatedNote.positionX += delta.y;

      setNotes([...notes]);

      socket.emit("update-note", updatedNote);
    }
  }

  function handleNewNote() {
    const newDocumentName = uuidV4();
    const newPositionX = 400;
    const newPositionY = 0;
    const newContent = ""; // You may initialize content as needed

    const newNoteData = {
      author: "Anonymous",
      documentName: newDocumentName,
      positionX: newPositionX,
      positionY: newPositionY,
      content: newContent,
    };

    createNote(newNoteData)
      .then((result) => {
        if (typeof result !== "string") {
          setNotes([...notes, result]);
        } else {
          console.error("Error creating note:", result);
        }
      })
      .catch((error) => {
        console.error("Error creating note:", error);
      });
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
          <div ref={setNodeRef} style={dropAreaSize}>
            {notes.map((note) => (
              <Note
                styles={{
                  position: "relative",
                  left: `${note.positionX || 200}px`,
                  top: `${note.positionY || 100}px`,
                }}
                key={note.documentName}
                author={note.author}
                documentName={note.documentName || ""}
                id={note.documentName || ""}
              />
            ))}
          </div>
        </div>
      </DndContext>
    </Main>
  );
}
