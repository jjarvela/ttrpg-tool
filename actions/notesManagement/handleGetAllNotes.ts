"use server";
import { NoteData } from "@/app/(user)/server/[serverId]/notes/page";
import { getAllNotes } from "@/prisma/services/notesService";

export default async function handleGetAllNotes(
  server_id: string,
): Promise<NoteData[]> {
  try {
    const notes = await getAllNotes(server_id);
    if (typeof notes === "string") {
      return [];
    }
    return notes;
  } catch (error) {
    console.error("Error getting all notes:", error);
    throw new Error("Error getting all notes");
  }
}
