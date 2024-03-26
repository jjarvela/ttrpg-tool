import { db } from "../db";

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  } catch (e) {
    return (e as Error).message;
  }
};

export const createUser = async (data: {
  email: string;
  username: string;
  password_hash: string;
}) => {
  try {
    const newUser = await db.user.create({
      data: data,
    });
    return newUser;
  } catch (e) {
    return (e as Error).message;
  }
};
