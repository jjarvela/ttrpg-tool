"use client";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { useEffect, useState } from "react";
import FrameStyle1 from "./Frames/FrameStyle1";
import FrameStyle2 from "./Frames/FrameStyle2";
import FrameStyle3 from "./Frames/FrameStyle3";
import getBlobSASUrl from "@/actions/getBlobSASUrl";

export default function GamePiece({
  character,
  style,
  color,
  hoverEffect,
  size,
}: {
  character: {
    class: string;
    level: number;
    base: { name: string; image: string | null };
  };
  style: number;
  color: string;
  hoverEffect?: boolean;
  size?: number;
}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (character.base.image) {
      try {
        getBlobSASUrl(character.base.image).then((url) => setUrl(url));
      } catch (e) {
        return;
      }
    }
  });

  function selectStyle(style: number) {
    if (style.toString().startsWith("1")) {
      return "url(#circle)";
    }
    if (style.toString().startsWith("2")) {
      return "url(#diamond)";
    }
    if (style.toString().startsWith("3")) {
      return "url(#hexagon)";
    }
    return "url(#circle)";
  }

  function setFrame(style: number): JSX.Element | null {
    if (style.toString().startsWith("1")) {
      switch (style) {
        case 1:
          return <FrameStyle1 color={color} />;
        default:
          return null;
      }
    }
    if (style.toString().startsWith("2")) {
      switch (style) {
        case 2:
          return <FrameStyle2 color={color} />;
        default:
          return null;
      }
    }
    if (style.toString().startsWith("3")) {
      switch (style) {
        case 3:
          return <FrameStyle3 color={color} />;
        default:
          return null;
      }
    }
    return null;
  }

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative flex items-center justify-items-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseDown={() => setIsHovering(false)}
    >
      <div
        className="overflow-hidden"
        style={{
          width: size || 100,
          height: size || 100,
          background: "var(--primary-to-accent)",
          backgroundColor: "#d9ebd1",
          clipPath: selectStyle(style),
        }}
      >
        {url !== "" && (
          <img
            alt={character.base.name}
            src={url}
            style={{ minHeight: "100%", minWidth: "100%", objectFit: "cover" }}
          />
        )}
        <svg width={0} height={0}>
          <clipPath id="circle" clipPathUnits="objectBoundingBox">
            <circle id="circle" cx="0.489" cy="0.484" r="0.4" />{" "}
          </clipPath>
          <clipPath id="diamond" clipPathUnits="objectBoundingBox">
            <path
              id="diamond"
              d="M0.5,0.1L0.9,0.483L0.485,0.9L0.142,0.483L0.485,0.1Z"
            />
          </clipPath>
          <clipPath id="hexagon" clipPathUnits="objectBoundingBox">
            <path
              id="hexagon"
              d="M0.627,0.083L0.9,0.483L0.727,0.803L0.282,0.803L0.1,0.483L0.442,0.063L0.627,0.083Z"
            />
          </clipPath>
        </svg>
      </div>
      {setFrame(style)}
      {hoverEffect && isHovering && (
        <ColumnWrapper className="bg-color-dark absolute left-20 top-2 w-max gap-0 rounded-lg">
          <p>{character.base.name}</p>
          <small>
            {character.class}
            <span className="ml-1">Lvl {character.level}</span>
          </small>
        </ColumnWrapper>
      )}
    </div>
  );
}
