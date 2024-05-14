"use server";
import { NoteData } from "@/app/(user)/server/[serverId]/notes/page";
import { updateNoteContent } from "@/prisma/services/notesService";

export default async function handleNoteContentChange(
  id: string,
  content: string,
): Promise<NoteData> {
  try {
    const updatedNote = await updateNoteContent(id, content);
    if (typeof updatedNote === "string") {
      throw new Error(updatedNote);
    }
    return updatedNote;
  } catch (error) {
    console.error("Error updating note content:", error);
    throw new Error("Error updating note content");
  }
}
