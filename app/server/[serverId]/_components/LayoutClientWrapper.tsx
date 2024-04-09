"use client"

import TopMenu from "@/app/_components/TopMenu";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { ReactNode, useState } from "react";

export default function LayoutClientWrapper({id, innerNav, membersMenu, children} : {id: string, innerNav: ReactNode, membersMenu: ReactNode, children: ReactNode}) {
  const [showMembers, setShowMembers] = useState(true);
  return (<div className="flex flex-grow">
      {/*server inner nav*/}
      {innerNav}

      {/*top menu and content*/}
      <ColumnWrapper
        align="items-start"
        className="m-0 flex-grow gap-0 p-0 lg:gap-2"
      >
        <TopMenu serverId={id} setShowMembers={setShowMembers}/>
        {children}
      </ColumnWrapper>

      {/*server members bar*/}
      {showMembers && membersMenu}
    </div>)
}