"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

/**
 * This component can be called when a client needs to refresh after a certain amount of time
 * @param array unknown[] (probably notifications)
 * @param timeout number, milliseconds to wait before refresh. Defaults to 5000.
 * @param children React.ReactNode
 * @returns a react Fragment
 */
export function Refresher({
  array,
  timeout,
  children,
}: {
  array: unknown[];
  timeout?: number;
  children: React.ReactNode;
}) {
  console.log("refresher");
  const router = useRouter();
  useEffect(() => {
    if (array.length > 0) {
      setTimeout(() => {
        router.refresh();
      }, timeout || 5000);
    }
  });

  return <Fragment>{children}</Fragment>;
}
