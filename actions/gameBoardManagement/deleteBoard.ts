"use server";

import { deleteGameBoard } from "@/prisma/services/gameBoardService";
import deleteBlob from "../deleteBlob";

export default async function deleteBoard(board_id: string) {
  const board = await deleteGameBoard(board_id);

  if (board.background) {
    await deleteBlob(board.background);
  }

  return board;
}
