"use server";
import { NoteData } from "@/app/(user)/server/[serverId]/notes/page";
import { createNote } from "@/prisma/services/notesService";
import { v4 as uuidV4 } from "uuid";

export default async function handleNewNote() {
  const newDocumentName = uuidV4();
  const newPositionX = 200;
  const newPositionY = 0;
  const newContent = ""; // You may initialize content as needed

  const newNoteData = {
    author: "Anonymous",
    documentName: newDocumentName,
    positionX: newPositionX,
    positionY: newPositionY,
    content: newContent,
  };

  try {
    const result = await createNote(newNoteData);
    return result as NoteData; // Ensure it always returns a NoteData object
  } catch (error) {
    console.error("Error creating note:", error);
    throw new Error("Error creating note");
  }
}
