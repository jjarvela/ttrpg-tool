"use client";

import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsManufacturing from "@/public/icons/MaterialSymbolsManufacturing";
import Link from "next/link";

export default function SelfOptionsElement({ user_id }: { user_id: string }) {
  return (
    <RowWrapper
      align="items-center"
      justify="justify-items-center"
      className="px-2 sm:flex-col sm:py-[1.3rem]"
    >
      <Link href={"/preferences"}>
        <MaterialSymbolsManufacturing className="flex-shrink-0 cursor-pointer text-2xl" />
      </Link>
    </RowWrapper>
  );
}
