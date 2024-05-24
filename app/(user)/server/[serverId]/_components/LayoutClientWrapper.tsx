"use client";

import TopMenu from "@/app/(user)/server/[serverId]/_components/TopMenu";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsGroupOutline from "@/public/icons/MaterialSymbolsGroupOutline";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
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
  return (
    <div
      className={twMerge(
        "flex max-w-[76vw] flex-grow sm:max-w-[80vw] ",
        showMembers
          ? "lg:max-w-[94vw] xl:max-w-[99vw]"
          : "mlg:max-w-[95vw] xl:max-w-[100vw]",
      )}
    >
      {/*server inner nav*/}
      <RowWrapper
        className={twMerge("gap-0 md:max-w-[15%]", showInnerNav ? "w-40" : "")}
      >
        <div
          className={twMerge(
            "h-full w-full md:block",
            showInnerNav ? "block" : "hidden",
          )}
        >
          {innerNav}
        </div>
        <div className="flex h-[5%] cursor-pointer flex-col rounded-r-lg bg-black50 text-lg md:hidden">
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
          "m-0 max-h-screen flex-grow gap-0 p-0 md:max-h-[90%] lg:gap-2",
          showMembers ? "max-w-[80%]" : "max-w-[95%]",
        )}
      >
        <TopMenu serverId={id} setShowMembers={setShowMembers} />
        {children}
      </ColumnWrapper>

      {/*server members bar*/}
      <RowWrapper className="bg-color-dark absolute right-0 top-0 z-[999] h-full border-l-[1px] border-black50 pl-2 lg:relative lg:z-0 lg:pl-0">
        <MaterialSymbolsGroupOutline
          className="block h-7 w-7 cursor-pointer self-start justify-self-center opacity-60 hover:opacity-100 lg:hidden"
          onClick={() => setShowMembers((prev) => !prev)}
        />
        {showMembers && membersMenu}
      </RowWrapper>
    </div>
  );
}
