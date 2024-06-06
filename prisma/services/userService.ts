import db from "../db";

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

interface UserResult extends UserBasic {
  blocklist: string[];
}
export const searchUsers = async (
  searchTerm: string,
): Promise<UserResult[]> => {
  const users = db.user.findMany({
    where: {
      OR: [
        { username: { contains: searchTerm, mode: "insensitive" } },
        { screen_name: { contains: searchTerm, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      username: true,
      screen_name: true,
      profile_image: true,
      person_status: true,
      socket_id: true,
      blocklist: true,
    },
  });

  return users;
};

export const createUser = async (data: {
  email: string;
  username: string;
  password_hash: string;
}) => {
  const newUser = await db.user.create({
    data: data,
  });

  await db.friendList.create({
    data: {
      owner_id: newUser.id,
    },
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

export const getUsersExcept = async (user_id: string, select?: UserSelect) => {
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

export const getUserBlocklist = async (
  user_id: string,
): Promise<Omit<UserBasic, "person_status" | "socket_id">[]> => {
  const blocklist = await db.user.findUniqueOrThrow({
    where: { id: user_id },
    select: { blocklist: true },
  });

  if (blocklist.blocklist.length < 1) {
    return [];
  }

  const users = await db.user.findMany({
    where: {
      id: { in: blocklist.blocklist },
    },
    select: {
      id: true,
      username: true,
      screen_name: true,
      profile_image: true,
    },
  });

  return users;
};

/**
 * Add user to another user's blocklist
 * @param user_id - string
 * @param target_id  - string
 */
export const addToBlocklist = async (
  user_id: string,
  target_id: string,
): Promise<void> => {
  const user = await db.user.findUniqueOrThrow({
    where: { id: user_id },
    select: { blocklist: true },
  });

  await db.user.update({
    where: { id: user_id },
    data: {
      blocklist: [...user.blocklist, target_id],
    },
  });
};

/**
 * Remove user from another user's blocklist
 * @param user_id - string
 * @param target_id - string
 */
export const removeFromBlocklist = async (
  user_id: string,
  target_id: string,
): Promise<void> => {
  const user = await db.user.findUniqueOrThrow({
    where: { id: user_id },
    select: { blocklist: true },
  });

  await db.user.update({
    where: { id: user_id },
    data: {
      blocklist: user.blocklist.filter((item) => item !== target_id),
    },
  });
};

/**
 * Check if target user is blocked by user
 * @param user_id - string, user whose blocklist is queried
 * @param target_id - string, user whose ID is being queried for
 * @returns boolean based on whether target_id was present on user's blocklist or not
 */
export const isBlocked = async (
  user_id: string,
  target_id: string,
): Promise<boolean> => {
  const user = await db.user.findUniqueOrThrow({
    where: { id: user_id },
    select: { blocklist: true },
  });

  if (user.blocklist.indexOf(target_id) > -1) {
    return true;
  }

  return false;
};
