import { db } from "../db";

/**
 * Create a new server for users to chat and play together
 * @param data {server_name: string; description?: string; image?: string;}
 * @returns The newly created server - 
  id: string;
  socket_id: string | null;
  server_name: string;
  image: string | null;
  jamboard: string | null;
  gameboard: string | null;
  created_at: Date;
  description: string | null;
}
 */
export const createServerEntry = async (data: {
  server_name: string;
  description?: string;
  image?: string;
}): Promise<ServerData> => {
  const server = await db.server.create({ data });

  return server;
};

/**
 * Create the initial configurations for a server. One server can only have one config.
 * @param data {
  server_id: string;
  config_permission: string;
  protected?: boolean;
  password_hash?: string;
  explorable?: boolean;
  searchable?: boolean;
}
 * @returns the newly-created server config
 */
export const createServerConfig = async (data: {
  server_id: string;
  config_permission: string;
  protected?: boolean;
  password_hash?: string;
  explorable?: boolean;
  searchable?: boolean;
}): Promise<ServerConfig> => {
  const serverConfig = await db.serverConfig.create({ data });

  return serverConfig;
};

/**
 * Create a new instance of a server member
 * @param data - {
  server_id: string;
  member_id: string;
  role: string;
}
 * @returns the newly created server member - {
    id: number;
    server_id: string;
    member_id: string;
    role: string;
    nickname: string | null;
    icon: string | null;
}
 */
export const createServerMember = async (data: {
  server_id: string;
  member_id: string;
  role: string;
}): Promise<Omit<ServerMember, "user">> => {
  const serverMember = await db.serverMember.create({ data });

  return serverMember;
};

/**
 * Get the data of a specific server
 * @param server_id - string
 * @param select optional property to set which properties should be included - {
    select: { [key: string]: boolean };
    server_members?: { [key: string]: boolean };
    config?: { [key: string]: boolean };
    channels?: { [key: string]: boolean };
    invitations?: { [key: string]: boolean };
  }
 * @returns original or custom selection of properties for the server
  to get server memebers, config, channels or invitations, please use the select object
 */
export const getServerData = async (
  server_id: string,
  select?: {
    select: ServerDataSelect;
    server_members?: Omit<ServerMemberSelect, "user">;
    config?: ServerConfigSelect;
    channels?: { [key: string]: boolean };
    invitations?: { [key: string]: boolean };
  },
): Promise<ServerData> => {
  if (select?.select) {
    const server = await db.server.findUnique({
      where: { id: server_id },
      select: {
        ...select.select,
        server_members: select.server_members
          ? {
              select: {
                ...select.server_members,
                user: {
                  select: {
                    username: true,
                    profile_image: true,
                    screen_name: true,
                    timezone: true,
                    share_timezone: true,
                    socket_id: true,
                    person_status: true,
                  },
                },
              },
            }
          : false,
        config: select.config ? { select: { ...select?.config } } : false,
        channels: select.channels ? { select: { ...select?.channels } } : false,
        invitations: select.invitations
          ? { select: { ...select?.invitations } }
          : false,
      },
    });

    if (!server) throw new Error("No server found");

    return server;
  }

  const server = await db.server.findUnique({
    where: { id: server_id },
    include: {
      server_members: select?.server_members
        ? {
            select: {
              ...select?.server_members,
              user: {
                select: {
                  username: true,
                  profile_image: true,
                  screen_name: true,
                  timezone: true,
                  share_timezone: true,
                  socket_id: true,
                  person_status: true,
                },
              },
            },
          }
        : false,
      config: select?.config ? { select: { ...select?.config } } : false,
      channels: select?.channels ? { select: { ...select?.channels } } : false,
      invitations: select?.invitations
        ? { select: { ...select?.invitations } }
        : false,
    },
  });

  if (!server) throw new Error("No server found");

  return server;
};

/**
 * Get server's name, configuration properties related to joining and possible invitations
 * @param server_id - string
 * @returns server object with partial config and invitation array - {
  id: string;
  server_name: string;
  config: { join_permission: string | null; protected: boolean | null }[];
  invitations: {
    id: string;
    used_count: number;
    max_uses: number | null;
    expires: string;
  }[];
}
 */
export const getServerJoinData = async (
  server_id: string,
): Promise<{
  id: string;
  server_name: string;
  config: { join_permission: string | null; protected: boolean | null }[];
  invitations: {
    id: string;
    used_count: number;
    max_uses: number | null;
    expires: string;
  }[];
}> => {
  const server = await db.server.findUnique({
    where: { id: server_id },
    select: {
      id: true,
      server_name: true,
      config: { select: { join_permission: true, protected: true } },
      invitations: {
        select: { id: true, used_count: true, max_uses: true, expires: true },
      },
    },
  });

  if (!server) throw new Error("No server could be found");

  return server;
};

/**
 * Update a server's information
 * @param server_id - string
 * @param data - { server_name?: string; description?: string; image?: string }
 * @returns the updated server object - {
  id: string;
  socket_id: string | null;
  server_name: string;
  image: string | null;
  jamboard: string | null;
  gameboard: string | null;
  created_at: Date;
  description: string | null;
}
 */
export const updateServerData = async (
  server_id: string,
  data: { server_name?: string; description?: string; image?: string },
): Promise<ServerData> => {
  const server = await db.server.update({ where: { id: server_id }, data });
  return server;
};

/**
 * Delete a server
 * @param server_id 
 * @returns the deleted server object - {
    id: string;
    socket_id: string | null;
    server_name: string;
    image: string | null;
    jamboard: string | null;
    gameboard: string | null;
    created_at: Date;
    description: string | null;
}
 */
export const deleteServerData = async (
  server_id: string,
): Promise<ServerData> => {
  const server = await db.server.delete({ where: { id: server_id } });

  return server;
};

/**
 * Get server's configuration information
 * @param server_id - string
 * @param select optional property to set which properties should be included - { [key: string]: boolean }
 * @returns full or partial server config object depending on select - {
    id: number;
    server_id: string;
    config_permission: string;
    protected: boolean | null;
    password_hash: string | null;
    explorable: boolean | null;
    searchable: boolean | null;
    join_permission: string | null;
}
 */
export const getServerConfig = async (
  server_id: string,
  select?: { [key: string]: boolean },
) => {
  const config = await db.serverConfig.findUnique({
    where: { server_id: server_id },
    select: select,
  });

  if (!config) throw new Error("No config could be found");

  return config;
};

/**
 * Update a server's configuration information
 * @param server_id - string
 * @param data - {
    config_permission?: string;
    protected?: boolean | null;
    password_hash?: string;
    explorable?: boolean;
    searchable?: boolean;
    join_permission?: string;
  }
 * @returns the updated server config object {
  id: number;
  server_id: string;
  config_permission: string;
  protected: boolean | null;
  password_hash: string | null;
  explorable: boolean | null;
  searchable: boolean | null;
  join_permission: string | null;
}
 */
export const updateServerConfig = async (
  server_id: string,
  data: {
    config_permission?: string;
    protected?: boolean | null;
    password_hash?: string;
    explorable?: boolean;
    searchable?: boolean;
    join_permission?: string;
  },
): Promise<ServerConfig> => {
  const config = await db.serverConfig.update({
    where: { server_id: server_id },
    data,
  });

  return config;
};

/**
 * Get the information on members of a specific server
 * @param server_id - string
 * @returns array of server members including select information from the user table
 */
export const getServerMembers = async (
  server_id: string,
): Promise<ServerMember[]> => {
  const members = await db.serverMember.findMany({
    where: { server_id: server_id },
    include: {
      user: {
        select: {
          username: true,
          profile_image: true,
          screen_name: true,
          timezone: true,
          share_timezone: true,
          socket_id: true,
          person_status: true,
        },
      },
    },
  });

  return members;
};

/**
 * Get all server members apart from designated user
 * @param server_id - string
 * @param member_id - string, user to be omitted
 * @returns array of server members {
    id: number;
    server_id: string;
    member_id: string;
    role: string;
    nickname: string | null;
    icon: string | null;
    user: {
        username: string;
        screen_name: string | null;
        timezone: string | null;
        share_timezone: boolean | null;
        profile_image: string | null;
        person_status: string | null;
        socket_id: string | null;
    };
}
 */
export const getServerMembersExcept = async (
  server_id: string,
  member_id: string,
): Promise<ServerMember[]> => {
  const members = await db.serverMember.findMany({
    where: { server_id, member_id: { not: member_id } },
    include: {
      user: {
        select: {
          username: true,
          profile_image: true,
          screen_name: true,
          timezone: true,
          share_timezone: true,
          socket_id: true,
          person_status: true,
        },
      },
    },
  });

  return members;
};

/**
 * Get the information of a singular server member without the user table addition
 * @param server_id - string
 * @param member_id - string
 * @returns
 */
export const getServerMember = async (
  server_id: string,
  member_id: string,
): Promise<Omit<ServerMember, "user">> => {
  const member = await db.serverMember.findFirst({
    where: { server_id, member_id },
  });

  if (!member) throw new Error("No user could be found");

  return member;
};

/**
 * Update a server member's information
 * @param server_id - string
 * @param member_id - string
 * @param data - { role?: string; nickname?: string; icon?: string }
 * @returns the updated server member without user table data {
    id: number;
    server_id: string;
    member_id: string;
    role: string;
    nickname: string | null;
    icon: string | null;
}
 */
export const updateServerMember = async (
  server_id: string,
  member_id: string,
  data: { role?: string; nickname?: string; icon?: string },
): Promise<Omit<ServerMember, "user">> => {
  const member = await db.serverMember.findFirst({
    where: { server_id, member_id },
  });

  if (!member) throw new Error("No instance of server member could be found");

  const updatedMember = await db.serverMember.update({
    where: { id: member.id },
    data,
  });

  return updatedMember;
};

export const deleteServerMember = async (
  server_id: string,
  member_id: string,
): Promise<Omit<ServerMember, "user">> => {
  const member = await db.serverMember.findFirst({
    where: { server_id, member_id },
  });

  if (!member) throw new Error("No instance of server member could be found");

  const deletedMember = await db.serverMember.delete({
    where: { id: member.id },
  });

  return deletedMember;
};
