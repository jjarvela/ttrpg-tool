"use client";

import getBlobSASUrl from "@/actions/getBlobSASUrl";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

/**
 * Character Portrait that generates azure blob SAS url for the image src based on given filename
 * @param filename name of the file in azure storage
 * @param alt alt text
 * @param className additional or overriding classes
 * @returns JSX img element with default classes of "min-h-[100%] min-w-[100%] rounded-full object-cover transition-all group-hover:rounded-md"
 */
export default function CharacterPortrait({
  filename,
  alt,
  className,
}: {
  filename: string;
  alt: string;
  className?: string;
}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    try {
      getBlobSASUrl(filename).then((url) => setUrl(url));
    } catch (e) {
      return;
    }
  });
  return (
    <img
      src={url}
      alt={alt}
      className={twMerge("min-h-[100%] min-w-[100%] object-cover", className)}
    />
  );
}
