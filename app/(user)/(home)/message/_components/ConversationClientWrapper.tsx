"use client";

import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { socket } from "@/socket";
import { useEffect, useRef, useState } from "react";

export default function ConversationClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollTop = useRef<HTMLDivElement>(null);
  const scrollref = useRef<HTMLSpanElement>(null);
  const [error, setError] = useState("");

  socket.on("message-error", (error: string) => {
    setError(error);
  });

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
      className="scrollbar-thin p-0 w-full flex-grow overflow-y-auto"
    >
      {children}
      <span ref={scrollref} className="h-0 w-full"></span>
      {error !== "" && <p className="text-warning">{error}</p>}
    </ColumnWrapper>
  );
}
