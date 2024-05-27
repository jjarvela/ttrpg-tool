"use server";

import { updateGamePiece } from "@/prisma/services/gameBoardService";

export default async function movePiece(
  piece_id: string,
  position_x: number,
  position_y: number,
) {
  try {
    const result = await updateGamePiece(piece_id, { position_x, position_y });
    return result;
  } catch (error) {
    console.error("Error moving piece:", error);
    throw new Error("Error moving piece");
  }
}
