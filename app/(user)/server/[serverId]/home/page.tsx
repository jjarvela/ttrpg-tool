"use client";
import { useEffect, useState } from "react";
import { NoteData } from "../notes/page";
import { getCurrentUser } from "../notes/_components/GetCurrentUser";
import handleGetAllNotes from "@/actions/notesManagement/handleGetAllNotes";

export default function ServerHome() {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [user, setUser] = useState<{
    username: string;
    profile_image: string | null;
  } | null>(null);

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
  }, []);

  return (
    <div className="flex-grow overflow-auto p-5">
      <h2 className="text-lg font-semibold text-gray-800">Latest Notes</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div key={note.id} className="rounded-lg bg-gray-200 p-4 shadow">
            <h3 className="font-bold text-gray-700">{note.author}</h3>
            <p className="text-gray-600">{note.content}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}
