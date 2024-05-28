"use client";
import handleGetAllNotes from "@/actions/notesManagement/handleGetAllNotes";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../../notes/_components/GetCurrentUser";
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
  }, [serverId]);

  return (
    <div className="flex-grow overflow-auto p-5">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Latest Notes
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
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
