import { db } from "../db";

export const getUserById = async (user_id: string, select?: UserSelect) => {
  const user = await db.user.findUnique({
    where: {
      id: user_id,
    },
    select: select,
  });

  if (!user) throw new Error("No user could be found");

  return user;
};

export const getUsersById = async (user_ids: string[], select?: UserSelect) => {
  const users = await db.user.findMany({
    where: {
      id: { in: user_ids },
    },
    select: select,
  });

  return users;
};

export const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) throw new Error("No user could be found");

  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) throw new Error("No user could be found");

  return user;
};

export const getUsersByUsername = async (
  usernames: string[],
  select?: UserSelect,
) => {
  const user = await db.user.findMany({
    where: {
      username: { in: usernames },
    },
    select: select,
  });

  return user;
};

export const createUser = async (data: {
  email: string;
  username: string;
  password_hash: string;
}) => {
  const newUser = await db.user.create({
    data: data,
  });

  return newUser;
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
  const user = await db.user.findUnique({ where: { id: id } });

  if (!user) throw new Error("No user could be found");

  const updatedUser = await db.user.update({
    where: { id: id },
    data: data,
  });

  return updatedUser;
};

export const getUsersExcept = async (
  user_id: string,
  select?: { [key: string]: boolean },
) => {
  const users = await db.user.findMany({
    where: {
      id: {
        not: user_id,
      },
    },
    select: select,
  });

  return users;
};

export const getUserServers = async (
  userId: string,
  select?: { [key: string]: boolean },
) => {
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
};

export const findUserBySocket = async (socket_id: string) => {
  const user = db.user.findFirst({ where: { socket_id } });

  if (!user) throw new Error("No user could be found");

  return user;
};
