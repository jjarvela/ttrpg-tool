"use client";
import { usePathname } from "next/navigation";
import { io } from "socket.io-client";

const socket = io();

export default function LatestMessages() {
  const pathname = usePathname();
  const segments = pathname.split("/"); // This splits the pathname into an array

  // Check that segments array is long enough to have a serverId
  const serverId = segments.length > 2 ? segments[2] : null;

  return (
    <div className="flex flex-col overflow-auto bg-black75 p-5">
      <div className="flex">
        <h2 className="mx-auto text-lg font-semibold text-gray-800 dark:text-gray-200">
          Latest Messages
        </h2>
      </div>
      <div className="m-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <p>Moro</p>
      </div>
    </div>
  );
}
