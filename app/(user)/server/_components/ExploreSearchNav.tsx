"use client";

import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function ExploreSearchNav() {
  return (
    <RowWrapper
      className="mb-4 w-full border-b-[1px] border-black25 py-1 dark:border-black75"
      justify="justify-evenly"
    >
      <ExploreNavLink to="/server/explore" label="Explore" />
      <ExploreNavLink to="/server/search" label="Search" />
    </RowWrapper>
  );
}

function ExploreNavLink({ to, label }: { to: string; label: string }) {
  const path = usePathname();
  console.log(path);
  const ariaCurrent = to === path ? "page" : undefined;
  console.log(ariaCurrent);
  return (
    <Link
      className={twMerge(
        "rounded-lg px-2 py-1",
        ariaCurrent === "page" && "bg-primary-mid",
      )}
      href={`${to}`}
    >
      {label}
    </Link>
  );
}
