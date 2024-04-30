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
import { getData } from "./_components/GetNotes";

interface NoteData {
  name: Key | null | undefined;
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
        const data = await getData();
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
          note.name === updatedNote.name ? updatedNote : note,
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

    const updatedNote = notes.find((note) => note.name === noteId);
    if (updatedNote) {
      updatedNote.position.x += delta.x;
      updatedNote.position.y += delta.y;

      setNotes([...notes]);

      socket.emit("update-note", updatedNote);
    }
  }

  function handleNewNote() {
    const newDocumentName = uuidV4();
    const newNote = {
      name: newDocumentName,
      author: "Anonymous",
      documentName: newDocumentName,
      appId: appId,
      token: token,
      position: {
        x: 400,
        y: 0,
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
                  left: `${note.position.x || 200}px`,
                  top: `${note.position.y || 100}px`,
                }}
                key={note.name}
                author={note.author}
                documentName={note.name || ""}
                appId={appId}
                token={token}
                id={note.name || ""}
              />
            ))}
          </div>
        </div>
      </DndContext>
    </Main>
  );
}
