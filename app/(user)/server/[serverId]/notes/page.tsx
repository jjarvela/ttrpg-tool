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
import handleNotePositionChange from "@/actions/notesManagement/handleNotePosition";

export interface NoteData {
  id: string;
  author: string;
  authorUser?: {
    username: string | null;
    profile_image: string | null;
  };
  server_id: string;
  documentName: string;
  positionX: number;
  positionY: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const dropAreaSize: React.CSSProperties = {
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
    id: string;
    profile_image: string | null;
  } | null>(null);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

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
          console.log(data);
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
        console.log("Received note data:", data);
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
    if (serverId && user) {
      try {
        const newNote = await handleNewNote(serverId);

        const augmentedNote = {
          ...newNote,
          authorUser: {
            username: user.username,
            profile_image: user.profile_image,
          },
        };

        socket.emit("create-note", {
          note: augmentedNote,
          serverId: serverId,
        });

        setNotes((prevNotes) => [...prevNotes, augmentedNote]);
      } catch (error) {
        console.error("Error creating note:", error);
      }
    } else {
      console.log("No serverId provided for new note creation.");
    }
  }

  const handlePositionChange = useCallback(
    async (noteId: string, newPositionX: number, newPositionY: number) => {
      try {
        if (serverId !== null) {
          await handleNotePositionChange(
            noteId,
            newPositionX,
            newPositionY,
            serverId,
          );
        }
      } catch (error) {
        console.error("Error updating note position:", error);
      }
    },
    [serverId],
  );

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const noteId = event.active.id;
      const delta = event.delta;

      // Find the note based on noteId
      const note = notes.find((n) => n.id === noteId);
      if (!note) {
        console.error("Note not found:", noteId);
        return;
      }

      const newPositionX = note.positionX + delta.x;
      const newPositionY = note.positionY + delta.y;

      // Update the note's position in the local state
      setNotes((prevNotes) =>
        prevNotes.map((n) => {
          return n.id === noteId
            ? { ...n, positionX: newPositionX, positionY: newPositionY }
            : n;
        }),
      );

      // Perform the database update and socket communication

      handlePositionChange(note.id, newPositionX, newPositionY);

      // After updating the database, emit the updated note via socket
      socket.emit("update-note", {
        note: { ...note, positionX: newPositionX, positionY: newPositionY },
        serverId: serverId,
      });
    },
    [notes, handlePositionChange, serverId],
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
          className="scrollbar-thin h-[86vh] w-[64vw] overflow-auto xs:h-[80vh] xs:w-[68vw] sm:h-[76vh] md:h-[76vh] md:w-[70vw] lg:h-[84vh] lg:w-[76vw] xl:h-[90vh] xl:w-[80vw]"
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
                  username: user?.id,
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
