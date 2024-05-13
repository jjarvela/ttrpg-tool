"use client";

import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import { useState } from "react";

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
      <ColumnWrapper className=" h-full border-r-[1px] border-black50 p-0">
        {isOpen && conversationsMenu}
      </ColumnWrapper>
      {children}
    </RowWrapper>
  );
}
