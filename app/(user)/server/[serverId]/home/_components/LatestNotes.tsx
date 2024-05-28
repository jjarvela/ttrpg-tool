"use client";
import handleGetAllNotes from "@/actions/notesManagement/handleGetAllNotes";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../../notes/_components/GetCurrentUser";
import { NoteData } from "../../notes/page";

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
  }, [serverId]);

  return (
    <div className="flex-grow overflow-auto p-5">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Latest Notes
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div key={note.id} className="rounded-lg bg-gray-200 p-4 shadow">
            <h5 className="font-bold text-gray-700">{note.author}</h5>
            <p className="text-gray-600">{note.content}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}
