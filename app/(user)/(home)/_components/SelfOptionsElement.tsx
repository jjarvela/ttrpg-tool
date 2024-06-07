"use client";

import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsManufacturing from "@/public/icons/MaterialSymbolsManufacturing";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function SelfOptionsElement({
  user_id,
  mode,
}: {
  user_id: string;
  mode?: "row" | "column";
}) {
  return (
    <RowWrapper
      align="items-center"
      justify="justify-items-center"
      className={twMerge(
        "px-2 sm:py-[1.3rem]",
        mode !== "row" && "sm:flex-col ",
      )}
    >
      <Link href={"/preferences"}>
        <MaterialSymbolsManufacturing className="flex-shrink-0 cursor-pointer text-2xl" />
      </Link>
    </RowWrapper>
  );
}
