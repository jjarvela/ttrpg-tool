"use client";
import markRead from "@/actions/directMessageActions/markRead";
import markUnread from "@/actions/directMessageActions/markUnread";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MdiEmailOpenOutline from "@/public/icons/MdiEmailOpenOutline";
import MdiEmailOutline from "@/public/icons/MdiEmailOutline";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

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
    uid: string;
    message: string;
    created_at: Date;
  }[];
};

type Notification = {
  id: string;
  recipient_id: string;
  type: string;
  read_status: boolean;
  created_at: Date;
  message_id: string | null;
  conversation_id: string | null;
  channel_id: string | null;
  server_id: string | null;
};

export default function ConversationContextMenu({
  conversation,
  unread,
}: {
  conversation: Conversation;
  unread: Notification[];
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleMarkRead() {
    if (!isPending) {
      startTransition(async () => {
        await markRead(conversation.uid);
        router.refresh();
      });
    }
  }

  function handleMarkUnread() {
    if (!isPending) {
      startTransition(async () => {
        console.log("handle mark unread");
        await markUnread(conversation.uid, conversation.messages[0].uid);
        router.refresh();
      });
    }
  }

  return (
    <ColumnWrapper
      align="items-start content-start"
      className="bg-color-default cursor-pointer rounded-lg border-[1px] border-black50 p-4"
    >
      {unread.length > 0 ? (
        <RowWrapper
          onClick={(e) => {
            e.stopPropagation();
            handleMarkRead();
          }}
        >
          <p>Mark read</p>
          <MdiEmailOpenOutline />
        </RowWrapper>
      ) : (
        <RowWrapper
          onClick={(e) => {
            e.stopPropagation();
            handleMarkUnread();
          }}
        >
          <p>Mark unread</p>
          <MdiEmailOutline />
        </RowWrapper>
      )}
    </ColumnWrapper>
  );
}
