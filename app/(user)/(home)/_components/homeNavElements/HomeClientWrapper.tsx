"use client";

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
    <RowWrapper className="relative h-full w-full gap-0">
      <RowWrapper
        className={twMerge(
          "absolute h-full gap-0 lg:relative lg:w-[13.5em] lg:flex-shrink-0",
          isOpen ? "w-[13.5em] flex-shrink-0 md:relative" : "",
        )}
      >
        <div
          className={twMerge(
            "bg-color-default full z-50 h-full w-full border-r-[1px] border-black50 p-0 lg:block",
            isOpen ? "block" : "hidden",
          )}
        >
          {conversationsMenu}
        </div>
        <div
          id="inner-nav-toggle"
          className="z-50 flex h-[5%] cursor-pointer flex-col rounded-r-lg bg-black50 text-lg lg:hidden"
        >
          <MaterialSymbolsLightChevronLeftRounded
            className={twMerge(
              "my-auto cursor-pointer justify-self-center duration-300 ease-linear",
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
