import { db } from "../db";

export const getUserById = async (
  id: string,
  select?: { [key: string]: boolean },
) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
      select: select,
    });
    return user;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getUsersById = async (
  ids: string[],
  select?: { [key: string]: boolean },
) => {
  try {
    const user = await db.user.findMany({
      where: {
        id: { in: ids },
      },
      select: select,
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

export const getUsersByUsername = async (
  usernames: string[],
  select?: { [key: string]: boolean },
) => {
  try {
    const user = await db.user.findMany({
      where: {
        username: { in: usernames },
      },
      select: select,
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

export const updateUser = async (
  id: string,
  data: {
    username?: string;
    screen_name?: string;
    socket_id?: string | null;
    email?: string;
    timezone?: string;
    share_timezone?: boolean;
    profile_image?: string;
    person_description?: string;
    person_status?: string;
  },
) => {
  try {
    const user = await db.user.findUnique({ where: { id: id } });
    if (!user) return "User not found.";

    const updatedUser = await db.user.update({
      where: { id: id },
      data: data,
    });

    return updatedUser;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getUsersExcept = async (
  id: string,
  select?: { [key: string]: boolean },
) => {
  try {
    const users = await db.user.findMany({
      where: {
        id: {
          not: id,
        },
      },
      select: select,
    });
    return users;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getUserServers = async (
  userId: string,
  select?: { [key: string]: boolean },
) => {
  try {
    const memberIn = await db.serverMember.findMany({
      where: { member_id: userId },
    });
    const serverIds = memberIn.map((item) => {
      return item.server_id;
    });

    const servers = await db.server.findMany({
      where: {
        id: { in: serverIds },
      },
      select: select,
    });

    return servers;
  } catch (e) {
    return (e as Error).message;
  }
};

export const findUserBySocket = async (socket_id: string) => {
  try {
    const user = db.user.findFirst({ where: { socket_id } });
    return user;
  } catch (e) {
    return (e as Error).message;
  }
};
