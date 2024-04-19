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

export const updateServerData = async (
  id: string,
  data: { server_name?: string; description?: string; image?: string },
) => {
  try {
    const server = await db.server.update({ where: { id: id }, data });
    return server;
  } catch (e) {
    return (e as Error).message;
  }
};

export const deleteServerData = async (id: string) => {
  try {
    const server = await db.server.delete({ where: { id: id } });
    return;
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

export const updateServerConfig = async (
  server_id: string,
  data: {
    config_permission?: string;
    protected?: boolean | null;
    password_hash?: string;
    explorable?: boolean;
    searchable?: boolean;
  },
) => {
  try {
    const config = db.serverConfig.update({
      where: { server_id: server_id },
      data,
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

export const updateServerMember = async (
  server_id: string,
  member_id: string,
  data: { role?: string; nickname?: string; icon?: string },
) => {
  try {
    const member = await db.serverMember.findFirst({
      where: { server_id, member_id },
    });
    if (!member) return "No instance found for server member";
    const updatedMember = await db.serverMember.update({
      where: { id: member.id },
      data,
    });
    return updatedMember;
  } catch (e) {
    return (e as Error).message;
  }
};

export const deleteServerMember = async (
  server_id: string,
  member_id: string,
) => {
  try {
    const member = await db.serverMember.findFirst({
      where: { server_id, member_id },
    });
    if (!member) return "No instance found for server member";
    const deletedMember = await db.serverMember.delete({
      where: { id: member.id },
    });
    return deletedMember;
  } catch (e) {
    return (e as Error).message;
  }
};
