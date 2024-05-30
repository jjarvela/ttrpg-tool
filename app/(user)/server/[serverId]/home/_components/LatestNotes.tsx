"use client";
import handleGetAllNotes from "@/actions/notesManagement/handleGetAllNotes";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { NoteData } from "../../notes/page";
import HomeNote from "./HomeNote";
import { io } from "socket.io-client";

const socket = io();

export default function LatestNotes() {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [user, setUser] = useState<{
    username: string;
    profile_image: string | null;
  } | null>(null);

  const pathname = usePathname();
  const segments = pathname.split("/"); // This splits the pathname into an array

  // Check that segments array is long enough to have a serverId
  const serverId = segments.length > 2 ? segments[2] : null;

  function sortNotes(notes: NoteData[]) {
    return notes.sort(
      (
        a: { createdAt: string | number | Date },
        b: { createdAt: string | number | Date },
      ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  useEffect(() => {
    if (serverId) {
      socket.emit("join-note-server", serverId); // Join the server room
    }
  }, [serverId]); // This effect runs whenever the serverId changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (serverId) {
          const data = await handleGetAllNotes(serverId);
          // Assuming `data` is an array of notes and each note has a `createdAt` timestamp
          const sortedData = data.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
          });
          setNotes(sortedData);
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
          // Check if the note already exists to prevent duplicates
          if (!prevNotes.find((note) => note.id === data.note.id)) {
            const updatedNotes = [...prevNotes, data.note as NoteData]; // Add the new note
            return sortNotes(updatedNotes); // Sort notes after addition
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

  return (
    <div className="scrollbar-thin flex h-4/6 flex-col overflow-auto bg-black75 p-5 lg:max-h-96">
      <div className="flex">
        <h2 className="mx-auto text-lg font-semibold text-gray-800 dark:text-gray-200">
          Latest Notes
        </h2>
      </div>
      <div className="m-2 grid grid-cols-1 gap-5 lg:h-full lg:grid-cols-2 xl:grid-cols-3">
        {notes.slice(0, 6).map((note) => (
          <HomeNote
            note={note}
            currentUser={{
              username: user?.username || "",
              profile_image: user?.profile_image ?? null,
            }}
            styles={{}}
            key={note.id}
          />
        ))}
      </div>
    </div>
  );
}
