import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { auth } from "@/auth";
import { getUserConversations } from "@/prisma/services/conversationService";
import { redirect } from "next/navigation";
import ConversationThumb from "./ConversationThumb";
import { getUnreadForUserConversations } from "@/prisma/services/notificationService";
import ConversationContextMenu from "./ConversationContextMenu";
import errorHandler from "@/utils/errorHandler";
import FeedbackCard from "@/app/_components/FeedbackCard";
import ActiveUserDisplay from "@/app/_components/ActiveUserDisplay";
import TextInput from "@/app/_components/inputs/TextInput";
import UserSideNav from "./UserSideNav";
import { getUserReceivedRequests } from "@/prisma/services/friendService";

export default async function ConversationsMenu() {
  const session = await auth();

  if (!session || !(session as ExtendedSession).userId)
    return redirect("/welcome");

  const element: JSX.Element = await errorHandler(
    async () => {
      const conversations = await getUserConversations(
        (session as ExtendedSession).userId,
      );

      const notifications = await getUnreadForUserConversations(
        (session as ExtendedSession).userId,
        { type: true, conversation_id: true },
      );

      const readStatus = (id: string) => {
        for (const notification of notifications) {
          if (notification.conversation_id === id) return true;
        }
        return false;
      };

      const getUnread = (id: string) => {
        return notifications.filter((item) => item.conversation_id === id);
      };

      const friendRequests = await getUserReceivedRequests(
        (session as ExtendedSession).userId,
      );

      return (
        <ColumnWrapper className="h-full flex-grow p-0">
          <UserSideNav friendRequests={friendRequests} />
          <h4>Direct messages</h4>
          <TextInput
            placeholder="Search conversations..."
            className="w-[92%] overflow-hidden text-ellipsis"
          />
          <ColumnWrapper className="scrollbar-thin w-full flex-grow overflow-y-auto">
            {conversations.length > 0 ? (
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
            )}
          </ColumnWrapper>
          <ActiveUserDisplay />
        </ColumnWrapper>
      );
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return element;
}
