"use server";

import { deleteGameBoard } from "@/prisma/services/gameBoardService";

export default async function deleteBoard(board_id: string) {
  const board = await deleteGameBoard(board_id);
  return board;
}
