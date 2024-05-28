"use client";

import { useState } from "react";
import ColumnWrapper from "../wrappers/ColumnWrapper";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import { twMerge } from "tailwind-merge";

export default function ServerCharacterStatDisplay({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ColumnWrapper className="w-full p-0 pb-[0.1rem]">
      <div className="card-back flex w-full overflow-hidden">
        <div className="flex-grow px-4">
          <h5>{title}</h5>
        </div>
        <MaterialSymbolsLightChevronLeftRounded
          className={twMerge(
            "flex-shrink-0 cursor-pointer text-2xl",
            isOpen ? "rotate-90" : "-rotate-90",
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
      {isOpen && children}
    </ColumnWrapper>
  );
}
