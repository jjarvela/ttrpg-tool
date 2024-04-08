"use client";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function ServerSubMenu({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full cursor-pointer border-b-[1px] border-t-[1px]">
      <RowWrapper
        justify="justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
        className={twMerge("w-full px-2 py-1", isOpen && "border-b-[1px]")}
      >
        {title}{" "}
        <MaterialSymbolsLightChevronLeftRounded
          className={twMerge(
            "-rotate-180 text-xl duration-200 ease-in-out",
            isOpen ? "-rotate-90" : "",
          )}
        />
      </RowWrapper>
      {isOpen && (
        <ColumnWrapper
          align="items-start"
          className="scrollbar-thin mb-0 max-h-[15em] overflow-y-auto pb-0"
        >
          {children}
        </ColumnWrapper>
      )}
    </div>
  );
}
