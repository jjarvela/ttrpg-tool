"use client";

import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import Link from "next/link";

export default function ServerInnerNavLink({
  title,
  to,
}: {
  title: string;
  to: string;
}) {
  return (
    <Link
      href={to}
      className="flex w-full justify-between border-b-[1px] border-t-[1px] px-2 py-1"
    >
      {title}
      <MaterialSymbolsLightChevronLeftRounded className="-rotate-180 text-xl" />
    </Link>
  );
}
