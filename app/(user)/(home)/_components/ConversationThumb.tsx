"use client";

import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import Link from "next/link";

type Conversation = {
  id: number;
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
}: {
  conversation: Conversation;
  userId: string;
  hasUnread: boolean;
}) {
  const participants = conversation.participants.filter(
    (instance) => instance.participant.id !== userId,
  );

  const link = () => {
    if (participants.length === 1)
      return `/message/${participants[0].participant.id}`;
    return `/message/${conversation.uid}`;
  };

  return (
    <Link href={link()}>
      <ColumnWrapper className="relative w-60 rounded-lg hover:bg-black25 dark:hover:bg-black75">
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
          {participants.map((instance) => (
            <span key={instance.participant.id}>
              {instance.participant.screen_name ||
                instance.participant.username}{" "}
            </span>
          ))}
        </h5>
        <small className="w-full overflow-hidden text-ellipsis text-black50">
          {conversation.messages[0] ? conversation.messages[0].message : ""}
        </small>
      </ColumnWrapper>
    </Link>
  );
}
