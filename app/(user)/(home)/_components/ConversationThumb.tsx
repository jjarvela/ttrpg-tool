"use client";

import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import handleClickOutside from "@/utils/handleClickOutside";
import Link from "next/link";
import { useRef, useState } from "react";

type Conversation = {
  uid: string;
  channel_id: string | null;
  created_at: Date;
  participants: {
    participant: {
      id: string;
      username: string;
      screen_name: string | null;
    };
  }[];
  messages: {
    message: string;
    created_at: Date;
  }[];
};

export default function ConversationThumb({
  conversation,
  userId,
  hasUnread,
  contextMenu,
}: {
  conversation: Conversation;
  userId: string;
  hasUnread: boolean;
  contextMenu: React.ReactNode;
}) {
  const [showContext, setShowContext] = useState(false);
  const contextRef = useRef<HTMLDivElement>(null);

  const participants = conversation.participants.filter(
    (instance) => instance.participant.id !== userId,
  );
  const link = () => {
    if (participants.length === 1)
      return `/message/${participants[0].participant.id}`;
    return `/message/${conversation.uid}`;
  };

  return (
    <div className="relative">
      {showContext && (
        <div
          ref={contextRef}
          className="fixed z-50 translate-x-40 translate-y-0"
        >
          {contextMenu}
        </div>
      )}
      <Link
        href={link()}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowContext(true);
          if (contextRef) {
            document.addEventListener("mousedown", (event) => {
              handleClickOutside(contextRef, event, () => {
                setShowContext(false);
              });
            });
          }
        }}
      >
        <ColumnWrapper className="w-[13rem] rounded-lg hover:bg-black25 dark:hover:bg-black75">
          {hasUnread && (
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              className="absolute right-0 fill-primary"
            >
              <circle r={6} cx={8} cy={8} />
            </svg>
          )}
          <h5 className="w-full overflow-hidden text-ellipsis">
            {participants.length > 0 ? (
              participants.map((instance) => (
                <span key={instance.participant.id}>
                  {instance.participant.screen_name ||
                    instance.participant.username}{" "}
                </span>
              ))
            ) : (
              <span>No other participants</span>
            )}
          </h5>
          <small className="w-full overflow-hidden text-ellipsis text-black50">
            {conversation.messages[0] ? conversation.messages[0].message : ""}
          </small>
        </ColumnWrapper>
      </Link>
    </div>
  );
}
