"use client";

import TopMenu from "@/app/(user)/server/[serverId]/_components/TopMenu";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsGroupOutline from "@/public/icons/MaterialSymbolsGroupOutline";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function LayoutClientWrapper({
  id,
  innerNav,
  membersMenu,
  children,
}: {
  id: string;
  innerNav: ReactNode;
  membersMenu: ReactNode;
  children: ReactNode;
}) {
  const [showInnerNav, setShowInnerNav] = useState(true);
  const [showMembers, setShowMembers] = useState(true);

  const pathname = usePathname();

  const isNotes = pathname.endsWith("/notes");
  const isBoard =
    pathname.includes("/boards") && !pathname.endsWith("/boards" || "/create");

  return (
    <div className="relative flex w-[90vw] overflow-hidden sm:w-[100vw]">
      {/*server inner nav*/}
      <RowWrapper
        className={twMerge(
          "absolute h-full gap-0 lg:relative lg:w-[13.5em] lg:flex-shrink-0",
          showInnerNav ? "w-[13.5em] flex-shrink-0 md:relative" : "",
        )}
      >
        <div
          id="inner-nav-container"
          className={twMerge(
            "bg-color-default z-50 h-full w-full lg:block",
            showInnerNav ? "block" : "hidden",
          )}
        >
          {innerNav}
        </div>
        <div
          id="inner-nav-toggle"
          className="z-50 flex h-[5%] cursor-pointer flex-col rounded-r-lg bg-black50 text-lg lg:hidden"
        >
          <MaterialSymbolsLightChevronLeftRounded
            className={twMerge(
              "my-auto justify-self-center duration-300 ease-linear",
              showInnerNav ? "" : "rotate-180",
            )}
            onClick={() => setShowInnerNav((prev) => !prev)}
          />
        </div>
      </RowWrapper>

      {/*top menu and content*/}
      <ColumnWrapper
        align="items-start"
        className={twMerge(
          "m-0 max-h-screen flex-grow gap-0 p-0 lg:gap-2",
          isNotes || isBoard ? "w-[75%] mlg:w-[75%]" : "w-full",
        )}
      >
        <TopMenu serverId={id} setShowMembers={setShowMembers} />
        {children}
      </ColumnWrapper>

      {/*server members bar*/}
      <RowWrapper
        className={twMerge(
          "bg-color-dark z-[999] h-full border-l-[1px] border-black50 pl-2 lg:relative lg:z-0 lg:w-0 lg:pl-0",
          showMembers && "absolute right-0 top-0 lg:w-60",
        )}
      >
        <MaterialSymbolsGroupOutline
          className="block h-7 w-7 cursor-pointer self-start justify-self-center opacity-60 hover:opacity-100 lg:hidden"
          onClick={() => setShowMembers((prev) => !prev)}
        />
        {showMembers && membersMenu}
      </RowWrapper>
    </div>
  );
}
