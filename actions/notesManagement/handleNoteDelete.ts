"use server";
import { deleteNoteById } from "@/prisma/services/notesService";

export default async function handleNoteDelete(id: string, serverId: string) {
  try {
    const result = await deleteNoteById(id, serverId);
    return result;
  } catch (error) {
    console.error("Error deleting note", error);
    throw new Error("Error deleting note");
  }
}
