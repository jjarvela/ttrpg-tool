"use client";

import TextInput from "@/app/_components/inputs/TextInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { Fragment, useState } from "react";
import ConversationContextMenu from "./ConversationContextMenu";
import ConversationThumb from "./ConversationThumb";

export default function ConversationsMenu({
  user_id,
  conversations,
  notifications,
}: {
  user_id: string;
  conversations: Conversation[];
  notifications: Notif[];
}) {
  const readStatus = (id: string) => {
    for (const notification of notifications) {
      if (notification.conversation_id === id) return true;
    }
    return false;
  };

  const getUnread = (id: string) => {
    return notifications.filter((item) => item.conversation_id === id);
  };

  const conversationRecipients = conversations.map((conversation) => {
    const recipient = conversation.participants.filter(
      (participant) => participant.participant.id !== user_id,
    );
    return { ...conversation, recipient: recipient[0].participant };
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversationRecipients.filter((item) => {
    const screen_name = item.recipient.screen_name || "";
    if (
      screen_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.recipient.username.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  return (
    <Fragment>
      <h4>Direct messages</h4>
      <TextInput
        placeholder="Search conversations..."
        className="w-[92%] overflow-hidden text-ellipsis"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ColumnWrapper className="scrollbar-thin h-full w-full overflow-y-auto overflow-x-hidden">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <ConversationThumb
              key={conversation.uid}
              userId={user_id}
              conversation={conversation}
              hasUnread={readStatus(conversation.uid)}
              contextMenu={
                <ConversationContextMenu
                  conversation={conversation}
                  unread={getUnread(conversation.uid)}
                />
              }
            />
          ))
        ) : (
          <p>No conversations</p>
        )}
      </ColumnWrapper>
    </Fragment>
  );
}
