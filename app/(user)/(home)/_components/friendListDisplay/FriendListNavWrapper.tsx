"use client";

import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function FriendListNavWrapper({
  onlineList,
  allList,
  pendingList,
}: {
  onlineList: React.ReactNode;
  allList: React.ReactNode;
  pendingList: React.ReactNode;
}) {
  const [nav, setNav] = useState(1);

  return (
    <ColumnWrapper className="w-full">
      <RowWrapper>
        <small
          className={twMerge(
            "hover:bg-color-dark mini-link",
            nav === 1 && "bg-black25 dark:bg-black75",
          )}
          onClick={() => setNav(1)}
        >
          Online
        </small>

        <small
          className={twMerge(
            "hover:bg-color-dark mini-link",
            nav === 2 && "bg-black25 dark:bg-black75",
          )}
          onClick={() => setNav(2)}
        >
          All
        </small>
        <small
          className={twMerge(
            "hover:bg-color-dark mini-link",
            nav === 3 && "bg-black25 dark:bg-black75",
          )}
          onClick={() => setNav(3)}
        >
          Pending
        </small>
      </RowWrapper>
      {nav === 1 && onlineList}
      {nav === 2 && allList}
      {nav === 3 && pendingList}
    </ColumnWrapper>
  );
}
