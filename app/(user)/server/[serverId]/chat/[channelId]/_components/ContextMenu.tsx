"use client";

import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { Fragment, useRef, useState } from "react";
import handleClickOutside from "@/utils/handleClickOutside";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ContextMenu({
  serverId,
  channelId,
  channelName,
}: {
  serverId: string;
  channelId: string;
  channelName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const handleRightClick = (event: any) => {
    event.preventDefault();
    document.addEventListener("mousedown", (event) => {
      handleClickOutside(menuRef, event, () => setIsOpen(false));
    });

    setIsOpen((prev) => !prev);
  };
  const addbox = (
    <Fragment>
      <div className="relative">
        {isOpen && (
          <div
            id="hitbox"
            className="fixed translate-x-6 translate-y-2 "
            ref={menuRef}
          >
            <ColumnWrapper
              align="items-start"
              className="cursor-pointer rounded-lg border-[1px] border-black50 bg-white p-2 dark:bg-black75"
            >
              <p
                className="w-[max-content]"
                onClick={() => {
                  router.push(`/server/${serverId}/chat/${channelId}/add`);
                  setIsOpen(false);
                }}
              >
                Add members to channel
              </p>
            </ColumnWrapper>
          </div>
        )}
      </div>
    </Fragment>
  );
  return (
    <>
      <div onContextMenu={handleRightClick}>
        <Link href={`/server/${serverId}/chat/${channelId}`}>
          {channelName}{" "}
        </Link>
      </div>
      <div>{addbox}</div>
    </>
  );
}
