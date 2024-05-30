"use server";

import { createGameBoard } from "@/prisma/services/gameBoardService";

export default async function createBoard(
  server_id: string,
  data: {
    name: string;
    width: number;
    height: number;
    background?: string;
  },
) {
  const board = await createGameBoard(server_id, data);
  return board;
}
