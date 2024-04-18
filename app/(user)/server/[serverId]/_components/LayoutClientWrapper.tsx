"use client"

import TopMenu from "@/app/_components/TopMenu";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsGroupOutline from "@/public/icons/MaterialSymbolsGroupOutline";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function LayoutClientWrapper({id, innerNav, membersMenu, children} : {id: string, innerNav: ReactNode, membersMenu: ReactNode, children: ReactNode}) {
  const [showInnerNav, setShowInnerNav] = useState(true);
  const [showMembers, setShowMembers] = useState(true);
  return (<div className="flex flex-grow">
      {/*server inner nav*/}
      <RowWrapper className={twMerge("gap-0 md:max-w-[15%]", showInnerNav ? "w-40" : "")}>
      <div className={twMerge("h-full w-full md:block", showInnerNav ? "block" : "hidden")}>{innerNav}</div>
      <div className="flex flex-col rounded-r-lg bg-black50 md:hidden cursor-pointer text-lg h-[5%]">
        <MaterialSymbolsLightChevronLeftRounded className={twMerge("my-auto justify-self-center ease-linear duration-300", showInnerNav ? "" : "rotate-180")} onClick={() => setShowInnerNav(prev => !prev)}/>
      </div>
      </RowWrapper>

      {/*top menu and content*/}
      <ColumnWrapper
        align="items-start"
        className="m-0 flex-grow gap-0 p-0 lg:gap-2"
      >
        <TopMenu serverId={id} setShowMembers={setShowMembers}/>
        {children}
      </ColumnWrapper>

      {/*server members bar*/}
      <RowWrapper className="z-[999] lg:z-0 h-full bg-color-dark border-l-[1px] border-black50 pl-2 lg:pl-0 absolute top-0 right-0 lg:relative">
        <MaterialSymbolsGroupOutline className="h-7 w-7 cursor-pointer opacity-60 hover:opacity-100 block lg:hidden self-start justify-self-center" onClick={() => setShowMembers(prev => !prev)}/>
        {showMembers && membersMenu}
      </RowWrapper>
    </div>)
}