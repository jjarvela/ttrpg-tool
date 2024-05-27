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
  const x_spawn = Math.floor(Math.random() * board.width);
  const y_spawn = Math.floor(Math.random() * board.height);

  console.log(style);
  console.log(character_id);

  await createGamePiece(board_id, {
    character_id,
    user_id,
    style,
    color: "#ffff",
    position_x: x_spawn,
    position_y: y_spawn,
  });
}
