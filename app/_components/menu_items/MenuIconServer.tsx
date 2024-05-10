"use client";
import Link from "next/link";

type Server = {
  id: string;
  server_name: string;
  image: string | null;
};

/**
 * CLIENT component for server icon in side menu
 * @param server - server information (id, server_name, image)
 * @param icon - ReactNode, Icon component. Passed as prop to retain its server-side functionality
 * @param hasUnread - boolean on whether the user has unread notifications on the server
 * @returns JSX element with hover functionality
 */
export default function MenuIconServer({
  server,
  icon,
  hasUnread,
}: {
  server: Server;
  icon: React.ReactNode;
  hasUnread?: boolean;
}) {
  return (
    <div className="group relative">
      <Link href={`/server/${server.id}`}>
        <span className="relative my-2 inline-block h-12 w-12 cursor-pointer overflow-hidden rounded-full bg-black50 shadow-md transition-all group-hover:rounded-md">
          {server.image && icon}
        </span>
      </Link>
      {hasUnread && (
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          className="absolute -right-2 top-2 fill-primary"
        >
          <circle r={6} cx={8} cy={8} />
        </svg>
      )}
      <span className="pointer-events-none absolute bottom-5 left-20 -translate-x-1/2 transform rounded-md bg-black px-2 py-1 text-center text-white opacity-0 transition-opacity group-hover:opacity-100">
        {server.server_name}
      </span>
    </div>
  );
}
