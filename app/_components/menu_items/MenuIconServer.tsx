"use client";
import Link from "next/link";

type Server = {
  id: string;
  server_name: string;
  icon?: string;
};

export default function MenuIconServer({ server }: { server: Server }) {
  return (
    <Link href={`/server/${server.id}`}>
      <div className="group relative">
        <span className="relative my-2 inline-block h-12 w-12 cursor-pointer overflow-hidden rounded-full bg-gray-500 shadow-md transition-all group-hover:rounded-md">
          {server.icon && (
            <img
              src={server.icon}
              alt={server.server_name}
              className="rounded-full object-cover transition-all group-hover:rounded-md"
            />
          )}
        </span>
        <span className="absolute bottom-1 left-20 -translate-x-1/2 transform rounded-md bg-black px-2 py-1 text-center text-white opacity-0 transition-opacity group-hover:opacity-100">
          {server.server_name}
        </span>
      </div>
    </Link>
  );
}
