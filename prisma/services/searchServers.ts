import db from "../db";

export async function getAllBySearchTerm(searchTerm: string) {
  const servers = await db.server.findMany({
    where: {
      OR: [
        { server_name: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ],
      AND: {
        config: {
          some: {
            searchable: true,
          },
        },
      },
    },
    select: {
      id: true,
      server_name: true,
      created_at: true,
      description: true,
      image: true,
      config: { select: { join_permission: true } },
      invitations: { select: { max_uses: true, expires: true } },
      server_members: { select: { user: { select: { socket_id: true } } } },
    },
  });

  return servers;
}
