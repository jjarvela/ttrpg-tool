"use client";

import { Channel } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function ChannelThumb({ channel }: { channel: Channel }) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {});

  return (
    <Link
      href={`/server/${channel.server_id}/chat/${channel.uid}`}
      className={twMerge(
        "card-back relative h-[10rem] w-[14.5rem] overflow-hidden rounded-lg border-[1px] border-black50 duration-200 ease-linear",
        isHovering && "-translate-y-2",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {channel && (
        <div
          className={twMerge(
            "opacity-45 duration-200 ease-linear",
            isHovering && "opacity-100",
          )}
          style={{
            position: "absolute",
            minHeight: "100%",
            minWidth: "100%",
            objectFit: "cover",
          }}
        />
      )}
      <h4 className="absolute bottom-0 right-2">{channel.channel_name}</h4>
    </Link>
  );
}
