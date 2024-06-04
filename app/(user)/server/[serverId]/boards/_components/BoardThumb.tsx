"use client";

import getBlobSASUrl from "@/actions/getBlobSASUrl";
import { GameBoard } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function BoardThumb({ board }: { board: GameBoard }) {
  const [imageUrl, setImageUrl] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (board.background) {
      getBlobSASUrl(board.background).then((sasUrl) => {
        setImageUrl(sasUrl);
      });
    }
  });

  return (
    <Link
      href={`/server/${board.server_id}/boards/${board.id}`}
      className={twMerge(
        "card-back relative h-[10rem] w-[14.5rem] overflow-hidden rounded-lg border-[1px] border-black50 duration-200 ease-linear",
        isHovering && "-translate-y-2",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {imageUrl && (
        <img
          alt="Gameboard"
          src={imageUrl}
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
      <h4 className="absolute bottom-0 right-2">{board.name}</h4>
    </Link>
  );
}
