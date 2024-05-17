import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { auth } from "@/auth";
import { getUserConversations } from "@/prisma/services/conversationService";
import { redirect } from "next/navigation";
import ConversationThumb from "./ConversationThumb";
import { getUnreadForUserConversations } from "@/prisma/services/notificationService";
import ConversationContextMenu from "./ConversationContextMenu";
import UserSideMenuLink from "./UserSideMenuLink";
import MaterialSymbolsPersonPlayOutline from "@/public/icons/MaterialSymbolsPersonPlayOutline";

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
      <div className="mb-1 border-b-[1px] border-black50 py-1">
        <UserSideMenuLink
          title="Characters"
          to="/characters"
          icon={<MaterialSymbolsPersonPlayOutline className="text-2xl" />}
        />
      </div>
      {typeof conversations !== "string" ? (
        conversations.length > 0 ? (
          conversations.map((conversation) => (
            <ConversationThumb
              key={conversation.uid}
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
        )
      ) : (
        <p>No conversations</p>
      )}
    </ColumnWrapper>
  );
}
