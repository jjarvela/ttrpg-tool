"use server";

import { deleteGamePiece } from "@/prisma/services/gameBoardService";

export default async function deletePiece(piece_id: string) {
  const piece = await deleteGamePiece(piece_id);
  return piece;
}
