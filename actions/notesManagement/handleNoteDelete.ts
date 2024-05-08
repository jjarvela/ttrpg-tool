"use server";
import { deleteNoteById } from "@/prisma/services/notesService";

export default async function handleNoteDelete(id: string) {
  try {
    const result = await deleteNoteById(id);
    return result;
  } catch (error) {
    console.error("Error deleting note", error);
    throw new Error("Error deleting note");
  }
}
