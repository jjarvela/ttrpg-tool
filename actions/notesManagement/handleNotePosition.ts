"use server";
import { updateNotePosition } from "@/prisma/services/notesService";

export default async function handleNotePositionChange(
  id: string,
  positionX: number,
  positionY: number,
  serverId: string,
) {
  try {
    const result = await updateNotePosition(id, positionX, positionY, serverId);
    return result;
  } catch (error) {
    console.error("Error updating note position:", error);
    throw new Error("Error updating note position");
  }
}
