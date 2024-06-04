"use client";

import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function GamePieceManagerClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ColumnWrapper className="w-full gap-0 p-0">
      <RowWrapper className="card-back w-full justify-center">
        <div className="">
          <MaterialSymbolsLightChevronLeftRounded
            className={twMerge(
              "flex-shrink-0 cursor-pointer text-2xl duration-200 ease-linear",
              isOpen ? "-rotate-90" : "rotate-90",
            )}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </RowWrapper>
      <ColumnWrapper
        className={twMerge(
          "w-full gap-0 p-0 duration-200 ease-linear",
          isOpen ? "flex flex-col py-4" : "hidden h-0",
        )}
      >
        {children}
      </ColumnWrapper>
    </ColumnWrapper>
  );
}
