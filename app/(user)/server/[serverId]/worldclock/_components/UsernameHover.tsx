"use client";

import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { useState } from "react";

/**
 * This component provides a client wrapper with onMouseEnter and onMouseLeave events
 * @param username The desired name to be displayed on hover
 * @param children the server component(s) that are hovered over
 */
export default function UsernameHover({
  username,
  children,
}: {
  username: string;
  children: React.ReactNode;
}) {
  const [showElement, setShowElement] = useState(false);
  return (
    <ColumnWrapper
      justify="justify-center justify-items-center relative"
      className="m-0 p-0"
      onMouseEnter={() => setShowElement(true)}
      onMouseLeave={() => setShowElement(false)}
    >
      {children}
      {showElement && (
        <span className="fixed min-w-max translate-y-10 rounded-lg bg-black25 p-2 dark:bg-black">
          {username}
        </span>
      )}
    </ColumnWrapper>
  );
}
