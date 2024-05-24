"use server";
import { getCurrentUser } from "@/app/(user)/server/[serverId]/notes/_components/GetCurrentUser";
import { NoteData } from "@/app/(user)/server/[serverId]/notes/page";
import { createNote } from "@/prisma/services/notesService";
import { v4 as uuidV4 } from "uuid";

export default async function handleNewNote(server_id: string) {
  const newDocumentName = uuidV4();
  const newPositionX = 200;
  const newPositionY = 100;
  const newContent = "";

  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.username) {
    throw new Error("Current user or username is undefined");
  }

  const newNoteData = {
    author: currentUser?.username,
    documentName: newDocumentName,
    positionX: newPositionX,
    positionY: newPositionY,
    content: newContent,
    server_id: server_id,
  };

  try {
    const result = await createNote(newNoteData);
    return result as NoteData; // Ensure it always returns a NoteData object
  } catch (error) {
    console.error("Error creating note:", error);
    throw new Error("Error creating note");
  }
}
