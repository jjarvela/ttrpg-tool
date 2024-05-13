import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { auth } from "@/auth";
import { getUserConversations } from "@/prisma/services/conversationService";
import { redirect } from "next/navigation";
import ConversationThumb from "./ConversationThumb";
import { getUnreadForUserConversations } from "@/prisma/services/notificationService";
import ConversationContextMenu from "./ConversationContextMenu";

export default async function ConversationsMenu() {
  const session = await auth();

  if (!session || !(session as ExtendedSession).userId)
    return redirect("/welcome");

  const conversations = await getUserConversations(
    (session as ExtendedSession).userId,
  );

  const notifications = await getUnreadForUserConversations(
    (session as ExtendedSession).userId,
    { type: true, conversation_id: true },
  );

  const readStatus = (id: string) => {
    if (typeof notifications === "string") return false;
    for (const notification of notifications) {
      if (notification.conversation_id === id) return true;
    }
    return false;
  };

  const getUnread = (id: string) => {
    if (typeof notifications === "string") return [];
    return notifications.filter((item) => item.conversation_id === id);
  };

  return (
    <ColumnWrapper className="flex-grow">
      {typeof conversations !== "string" ? (
        conversations.map((conversation) => (
          <ConversationThumb
            key={conversation.id}
            userId={(session as ExtendedSession).userId}
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
  );
}
