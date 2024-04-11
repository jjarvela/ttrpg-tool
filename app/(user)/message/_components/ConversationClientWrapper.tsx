"use client";

import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { useEffect, useRef } from "react";

export default function ConversationClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollTop = useRef<HTMLDivElement>(null);
  const scrollref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    scrollref.current &&
      scrollTop.current?.scrollTo({
        top: scrollref.current.offsetTop,
        behavior: "instant",
      });
  });

  return (
    <ColumnWrapper
      refObject={scrollTop}
      className="scrollbar-thin w-full flex-grow overflow-y-auto"
    >
      {children}
      <span ref={scrollref} className="h-0 w-full"></span>
    </ColumnWrapper>
  );
}
