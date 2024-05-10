"use client";
import React, { useCallback, useEffect, useId, useState } from "react";
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
import { getCurrentUser } from "./_components/GetCurrentUser";

export interface NoteData {
  id: string;
  author: string;

  documentName: string;
  positionX: number;
  positionY: number;
  content: string;
}

const dropAreaSize = {
  width: "700px",
  height: "700px",
};

const socket = io();

export default function ServerNotes() {
  const id = useId();
  const { setNodeRef } = useDroppable({ id: "notes" });
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [user, setUser] = useState<{
    username: string;
    profile_image: string | null; // Make profile_image nullable
  } | null>(null);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const removeNoteFromState = useCallback((noteId: string) => {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteId),
    );
  }, []);

  const handleNoteDeletion = useCallback((deletedNoteId: string) => {
    setTimeout(() => {
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== deletedNoteId),
      );
    }, 300);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      setUser(userData);
    }

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetAllNotes();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    socket.on("update-note", (updatedNote) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.documentName === updatedNote.documentName ? updatedNote : note,
        ),
      );
    });

    socket.on("create-note", (newNote) => {
      setNotes((prevNotes) => [...prevNotes, newNote]);
    });

    socket.on("delete-note", handleNoteDeletion);

    return () => {
      socket.off("update-note");
      socket.off("create-note");
      socket.off("delete-note");
    };
  }, [handleNoteDeletion]);

  async function handleNewNoteClient() {
    try {
      const newNote = await handleNewNote();
      socket.emit("create-note", newNote);
      setNotes((prevNotes) => [...prevNotes, newNote]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const noteId = event.active.id;
    const delta = event.delta;

    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              positionX: note.positionX + delta.x,
              positionY: note.positionY + delta.y,
            }
          : note,
      );

      // Emit the updated note to the server
      const updatedNote = updatedNotes.find((note) => note.id === noteId);
      if (updatedNote) {
        socket.emit("update-note", updatedNote);
      }

      return updatedNotes;
    });
  }

  if (!user) {
    return null; // Render loading state or redirect to login
  }

  return (
    <Main className="m-0">
      <div className="mb-4 flex justify-center">
        <button onClick={handleNewNoteClient} className="btn btn-primary">
          New Note
        </button>
      </div>
      <DndContext
        id={id}
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
                  position: "fixed",
                  left: `${note.positionX}px`,
                  top: `${note.positionY}px`,
                }}
                key={note.documentName}
                note={note}
                onNoteDelete={removeNoteFromState}
                currentUser={{
                  username: user?.username,
                  profile_image: user?.profile_image,
                }}
              />
            ))}
          </div>
        </div>
      </DndContext>
    </Main>
  );
}
