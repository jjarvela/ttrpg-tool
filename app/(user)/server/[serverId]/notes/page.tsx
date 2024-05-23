"use client";
import React, { useCallback, useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
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
  server_id: string;
  documentName: string;
  positionX: number;
  positionY: number;
  content: string;
}

const dropAreaSize = {
  width: "1000px",
  height: "1000px",
  position: "relative",
};

const socket = io();

export default function ServerNotes() {
  const pathname = usePathname();
  const segments = pathname.split("/"); // This splits the pathname into an array

  // Check that segments array is long enough to have a serverId
  const serverId = segments.length > 2 ? segments[2] : null;

  const id = useId();
  const { setNodeRef } = useDroppable({ id: "notes" });
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [user, setUser] = useState<{
    username: string;
    profile_image: string | null;
  } | null>(null);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const removeNoteFromState = useCallback((noteId: string) => {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteId),
    );
  }, []);

  useEffect(() => {
    if (serverId) {
      socket.emit("join-note-server", serverId); // Join the server room
    }
  }, [serverId]); // This effect runs whenever the serverId changes

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
        if (serverId) {
          const data = await handleGetAllNotes(serverId);
          setNotes(data);
        } else {
          // Handle the case when serverId is null
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    socket.on("update-note", (data) => {
      if (data.serverId === serverId) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.documentName === data.note.documentName
              ? { ...data.note }
              : note,
          ),
        );
      }
    });

    socket.on("create-note", (data) => {
      if (data.serverId === serverId) {
        setNotes((prevNotes) => {
          // Only add the note if it doesn't already exist in the array
          if (!prevNotes.find((note) => note.id === data.note.id)) {
            return [...prevNotes, { ...data.note }];
          }
          return prevNotes;
        });
      }
    });

    return () => {
      socket.off("update-note");
      socket.off("create-note");
    };
  }, [serverId]);

  useEffect(() => {
    socket.on("delete-note", (data) => {
      if (data.serverId === serverId) {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note.id !== data.noteId),
        );
      }
    });

    return () => {
      socket.off("delete-note");
    };
  }, [serverId]);

  async function handleNewNoteClient() {
    if (serverId) {
      try {
        const newNote = await handleNewNote(serverId);
        socket.emit("create-note", { note: newNote, serverId: serverId });
        setNotes((prevNotes) => [...prevNotes, { ...newNote }]);
      } catch (error) {
        console.error("Error creating note:", error);
      }
    } else {
      console.log("No serverId provided for new note creation.");
    }
  }

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const noteId = event.active.id;
      const delta = event.delta;

      setNotes((prevNotes) => {
        return prevNotes.map((note) => {
          if (note.id === noteId) {
            const updatedNote = {
              ...note,
              positionX: note.positionX + delta.x,
              positionY: note.positionY + delta.y,
            };
            // Emit the updated note to the server
            socket.emit("update-note", {
              note: updatedNote,
              serverId: serverId,
            });
            return updatedNote;
          }
          return note;
        });
      });
    },
    [serverId],
  );

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
                  position: "absolute",
                  left: `${note.positionX}px`,
                  top: `${note.positionY}px`,
                }}
                key={note.id}
                note={note}
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
