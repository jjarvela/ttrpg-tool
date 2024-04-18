import { db } from "../db";

export const createServerEntry = async (data: {
  server_name: string;
  description?: string;
  image?: string;
}) => {
  try {
    const server = await db.server.create({ data });
    return server;
  } catch (e) {
    return (e as Error).message;
  }
};

export const createServerConfig = async (data: {
  server_id: string;
  config_permission: string;
  protected?: boolean;
  password_hash?: string;
  explorable?: boolean;
  searchable?: boolean;
}) => {
  try {
    const serverConfig = await db.serverConfig.create({ data });
    return serverConfig;
  } catch (e) {
    return (e as Error).message;
  }
};

export const createServerMember = async (data: {
  server_id: string;
  member_id: string;
  role: string;
}) => {
  try {
    const serverMember = await db.serverMember.create({ data });
    return serverMember;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getServerData = async (
  id: string,
  select?: { [key: string]: boolean },
) => {
  try {
    const server = await db.server.findUnique({
      where: { id: id },
      select: select,
    });
    return server;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getServerConfig = async (
  id: string,
  select?: { [key: string]: boolean },
) => {
  try {
    const config = await db.serverConfig.findUnique({
      where: { server_id: id },
      select: select,
    });
    return config;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getServerMembers = async (id: string) => {
  try {
    const members = await db.serverMember.findMany({
      where: { server_id: id },
      include: {
        user: {
          select: {
            username: true,
            profile_image: true,
            screen_name: true,
            timezone: true,
            share_timezone: true,
          },
        },
      },
    });
    return members;
  } catch (e) {
    return (e as Error).message;
  }
};

export const getServerMember = async (server_id: string, member_id: string) => {
  try {
    const member = await db.serverMember.findFirst({
      where: { server_id, member_id },
    });
    return member;
  } catch (e) {
    return (e as Error).message;
  }
};
