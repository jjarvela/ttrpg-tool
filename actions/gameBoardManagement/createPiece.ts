"use server";

import {
  createGamePiece,
  getGameBoard,
} from "@/prisma/services/gameBoardService";

export default async function createPiece(
  board_id: string,
  character_id: string,
  user_id: string,
  style: number,
) {
  const board = await getGameBoard(board_id);
  const x_spawn = Math.floor((Math.random() * board.width) / 2);
  const y_spawn = Math.floor((Math.random() * board.height) / 2);

  const piece = await createGamePiece(board_id, {
    character_id,
    user_id,
    style,
    color: "#ffffff",
    position_x: x_spawn,
    position_y: y_spawn,
  });

  return piece;
}
