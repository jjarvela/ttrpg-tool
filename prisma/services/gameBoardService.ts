import db from "../db";

export const createGameBoard = async (
  server_id: string,
  data: {
    name: string;
    width: number;
    height: number;
    background?: string;
  },
) => {
  const board = await db.gameBoard.create({ data: { ...data, server_id } });
  return board;
};

export const getGameBoard = async (board_id: string) => {
  const board = await db.gameBoard.findUnique({
    where: { id: board_id },
  });

  if (!board) {
    throw new Error("Board could not be found.");
  }

  return board;
};

export const getServerBoards = async (server_id: string) => {
  const boards = await db.gameBoard.findMany({
    where: { server_id: server_id },
  });

  return boards;
};

export const deleteGameBoard = async (board_id: string) => {
  const board = await db.gameBoard.delete({ where: { id: board_id } });
  return board;
};

export const createGamePiece = async (
  board_id: string,
  data: {
    character_id: string;
    user_id: string;
    style: number;
    color: string;
    position_x: number;
    position_y: number;
  },
) => {
  const piece = await db.gamePiece.create({
    data: {
      board_id,
      ...data,
    },
  });

  return piece;
};

export const getBoardPieces = async (
  board_id: string,
): Promise<GamePiece[]> => {
  const pieces = await db.gamePiece.findMany({
    where: { board_id },
    include: {
      character: {
        select: {
          class: true,
          level: true,
          base: { select: { name: true, image: true } },
        },
      },
    },
  });
  return pieces;
};

export const getUserPiecesForBoard = async (
  board_id: string,
  user_id: string,
): Promise<GamePiece[]> => {
  const pieces = await db.gamePiece.findMany({
    where: { board_id, AND: { user_id } },
    include: {
      character: {
        select: {
          class: true,
          level: true,
          base: { select: { name: true, image: true } },
        },
      },
    },
  });
  return pieces;
};

export const getGamePiece = async (piece_id: string): Promise<GamePiece> => {
  const piece = await db.gamePiece.findUnique({
    where: { id: piece_id },
    include: {
      character: {
        select: {
          class: true,
          level: true,
          base: { select: { name: true, image: true } },
        },
      },
    },
  });
  if (!piece) {
    throw new Error("Piece could not be found");
  }
  return piece;
};

export const updateGamePiece = async (
  piece_id: string,
  data: {
    style?: number;
    color?: string;
    position_x?: number;
    position_y?: number;
  },
) => {
  const piece = await db.gamePiece.update({
    where: { id: piece_id },
    data: data,
  });

  return piece;
};

export const deleteGamePiece = async (piece_id: string) => {
  const piece = await db.gamePiece.delete({
    where: { id: piece_id },
  });

  return piece;
};
