"use server";
import { NoteData } from "@/app/(user)/server/[serverId]/notes/page";
import { getAllNotes } from "@/prisma/services/notesService";

export default async function handleGetAllNotes(): Promise<NoteData[]> {
  try {
    const notes = await getAllNotes();
    if (typeof notes === "string") {
      return [];
    }
    return notes;
  } catch (error) {
    console.error("Error getting all notes:", error);
    throw new Error("Error getting all notes");
  }
}
