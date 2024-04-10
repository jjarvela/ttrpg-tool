"use client";

import Link from "next/link";
import MaterialSymbolsLightAdd from "../../../public/icons/MaterialSymbolsLightAdd";

export default function MenuButtonNewServer() {
  return (
    <Link href="/server/create">
      <span className="relative my-2 inline-block overflow-hidden rounded-full bg-black50 shadow-md transition-all group-hover:rounded-md">
        <MaterialSymbolsLightAdd
          width={40}
          height={40}
          className="h-12 w-12 cursor-pointer rounded-full transition-transform hover:rotate-180"
        />
      </span>
      <span className="pointer-events-none absolute bottom-1 left-20 -translate-x-1/2 transform rounded-md bg-black px-2 py-1 text-center text-white opacity-0 transition-opacity group-hover:opacity-100">
        Add server
      </span>
    </Link>
  );
}
