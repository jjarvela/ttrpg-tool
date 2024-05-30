"use server";

import { updateGamePiece } from "@/prisma/services/gameBoardService";

export default async function movePiece(
  piece_id: string,
  style: number,
  color: string,
) {
  try {
    const result = await updateGamePiece(piece_id, { style, color });
    return result;
  } catch (error) {
    console.error("Error updating piece:", error);
    throw new Error("Error updating piece");
  }
}
