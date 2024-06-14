"use client";

import MaterialSymbolsLightExploreOutlineRounded from "@/public/icons/MaterialSymbolsLightExploreOutlineRounded";
import Link from "next/link";

export default function MenuButtonNewServer() {
  return (
    <Link href="/server/explore">
      <span className="relative my-1 inline-block overflow-hidden rounded-full bg-black50 shadow-md transition-all group-hover:rounded-md">
        <MaterialSymbolsLightExploreOutlineRounded
          width={40}
          height={40}
          className="h-12 w-12 cursor-pointer rounded-full transition-transform hover:rotate-180"
        />
      </span>
      <span className="pointer-events-none absolute bottom-1 left-20 -translate-x-1/2 transform rounded-md bg-black px-2 py-1 text-center text-white opacity-0 transition-opacity group-hover:opacity-100">
        Explore Servers
      </span>
    </Link>
  );
}
