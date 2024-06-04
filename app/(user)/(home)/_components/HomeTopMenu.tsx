"use client";

import Button from "@/app/_components/Button";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightPersonPlayOutlineRounded from "@/public/icons/MaterialSymbolsLightPersonPlayOutlineRounded";
import MaterialSymbolsLightPersonRaisedHandOutlineRounded from "@/public/icons/MaterialSymbolsLightPersonRaisedHandOutlineRounded";
import { FriendRequest } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function HomeTopMenu({
  friendRequests,
}: {
  friendRequests: FriendRequest[];
}) {
  const pathname = usePathname();
  return (
    <RowWrapper className="bg-color-dark collapse h-0 w-full gap-10 border-b-[1px] border-black50 md:visible md:h-[3.5rem]">
      <RowWrapper className="w-[10.8rem] gap-4 border-r-[1px] border-black50 px-4">
        {!pathname.includes("characters") ? (
          <Fragment>
            <MaterialSymbolsLightPersonRaisedHandOutlineRounded className="flex-shrink-0 text-2xl" />
            <h5>Friends</h5>
          </Fragment>
        ) : (
          <Fragment>
            <MaterialSymbolsLightPersonPlayOutlineRounded className="flex-shrink-0 text-2xl" />
            <h5>Characters</h5>
          </Fragment>
        )}
      </RowWrapper>
      <RowWrapper className="gap-6">
        <Link
          className="font-heading text-lg aria-[current=page]:text-primary"
          href={"/"}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          Friend list
        </Link>
        <Link
          className="relative font-heading text-lg aria-[current=page]:text-primary"
          href={"/"}
          aria-current={pathname === "/friends/pending" ? "page" : undefined}
        >
          {friendRequests.length > 0 && (
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              className="absolute -right-3 top-0 fill-accent dark:fill-primary"
            >
              <circle r={6} cx={8} cy={8} />
            </svg>
          )}
          Friend Requests
        </Link>
        <Link
          className="font-heading text-lg aria-[current=page]:text-primary"
          href={"/"}
          aria-current={pathname === "/blocked" ? "page" : undefined}
        >
          Blocked
        </Link>
      </RowWrapper>
      <Button className="btn-primary">Add friend</Button>
    </RowWrapper>
  );
}
