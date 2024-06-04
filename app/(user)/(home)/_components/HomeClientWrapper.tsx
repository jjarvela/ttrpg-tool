"use client";

import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function HomeClientWrapper({
  conversationsMenu,
  children,
}: {
  conversationsMenu: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <RowWrapper className="h-full w-full gap-0">
      <RowWrapper
        className={twMerge(
          "h-full gap-0 lg:w-[14.5rem]",
          isOpen ? "w-[14.5rem]" : "",
        )}
      >
        <ColumnWrapper
          align="content-start items-start"
          className={twMerge(
            "full h-full w-full border-r-[1px] border-black50 p-0 lg:block",
            isOpen ? "block" : "hidden",
          )}
        >
          {conversationsMenu}
        </ColumnWrapper>
        <div
          id="inner-nav-toggle"
          className="flex h-[5%] cursor-pointer flex-col rounded-r-lg bg-black50 text-lg lg:hidden"
        >
          <MaterialSymbolsLightChevronLeftRounded
            className={twMerge(
              "my-auto justify-self-center duration-300 ease-linear",
              isOpen ? "" : "rotate-180",
            )}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </RowWrapper>
      {children}
    </RowWrapper>
  );
}
