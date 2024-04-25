"use client";
import React, { Key, useEffect, useId, useState } from "react";
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

/* const mockNotes: NoteData[] = [
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
]; */

export default function ServerNotes() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        console.log(data);
        setNotes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Run only once on mount

  const { setNodeRef } = useDroppable({ id: "notes" });
  const [notes, setNotes] = useState<NoteData[]>([]);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  // const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor);

  const dndId = useId();

  function handleDragEnd(event: DragEndEvent) {
    const noteId = event.active.id;
    const delta = event.delta;

    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.name === noteId) {
          return {
            ...note,
            position: {
              x: note.position.x + delta.x,
              y: note.position.y + delta.y,
            },
          };
        }
        return note;
      }),
    );
  }

  function handleNewNote() {
    const newDocumentName = uuidV4();
    const newNote: NoteData = {
      name: newDocumentName,
      author: "Anonymous",
      documentName: newDocumentName, // Unique document name for each note
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
                  left: `${note.position?.x || 200}px`, // Use 0 as default if position is undefined
                  top: `${note.position?.y || 100}px`, // Use 0 as default if position is undefined
                }}
                key={note.name}
                author={note.author}
                documentName={note.name?.toString() ?? ""} // Pass the documentName from note
                appId={appId} // Pass the appId from note
                token={token} // Pass the token from note
                id={note.name?.toString() ?? ""}
              />
            ))}
          </div>
        </div>
      </DndContext>
    </Main>
  );
}
