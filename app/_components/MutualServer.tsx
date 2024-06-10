"use client";

import getBlobSASUrl from "@/actions/getBlobSASUrl";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MutualServer({
  server,
}: {
  server: { id: string; server_name: string; image: string | null };
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (server.image && imageUrl === "") {
      getBlobSASUrl(server.image).then((url) => setImageUrl(url));
    }
  });
  return (
    <div className="relative">
      <Link
        href={`/server/${server.id}`}
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-black50"
        style={{ width: 30, height: 30 }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={server.server_name}
            className="min-h-[100%] min-w-[100%] rounded-full object-cover transition-all group-hover:rounded-md"
          />
        )}
      </Link>
      {hovering && (
        <p className="bg-color-dark absolute left-[-2.2rem] w-max rounded-md px-2 py-1">
          {server.server_name}
        </p>
      )}
    </div>
  );
}
