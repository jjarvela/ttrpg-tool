import { NoteData } from "@/app/(user)/server/[serverId]/notes/page";
import { db } from "../db";
export const getNoteById = async (id: string) => {
  try {
    const note = await db.note.findUnique({
      where: {
        id: id,
      },
    });
    return note;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getAllNotes = async (): Promise<NoteData[]> => {
  try {
    const notes = await db.note.findMany();
    return notes;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const createNote = async (data: {
  author: string;
  documentName: string;
  positionX: number;
  positionY: number;
  content: string;
}): Promise<NoteData | string> => {
  try {
    const newNote = await db.note.create({
      data: data,
    });
    return newNote;
  } catch (e) {
    return (e as Error).message;
  }
};

export const updateNotePosition = async (
  id: string,
  positionX: number,
  positionY: number,
) => {
  try {
    const note = await db.note.findUnique({ where: { id: id } });
    if (!note) return "Note not found.";

    const updatedNote = await db.note.update({
      where: { id: id },
      data: { positionX, positionY },
    });

    return updatedNote;
  } catch (e) {
    return (e as Error).message;
  }
};

export const updateNoteContent = async (id: string, content: string) => {
  try {
    const note = await db.note.findUnique({ where: { id: id } });
    if (!note) return "Note not found.";

    const updatedNote = await db.note.update({
      where: { id: id },
      data: { content },
    });

    return updatedNote;
  } catch (e) {
    return (e as Error).message;
  }
};

export const deleteNoteById = async (id: string) => {
  try {
    await db.note.delete({
      where: {
        id: id,
      },
    });
    return "Note deleted successfully";
  } catch (e) {
    return (e as Error).message;
  }
};
