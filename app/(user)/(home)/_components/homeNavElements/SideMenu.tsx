import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { auth } from "@/auth";
import { getUserConversations } from "@/prisma/services/conversationService";
import { redirect } from "next/navigation";
import { getUnreadForUserConversations } from "@/prisma/services/notificationService";
import errorHandler from "@/utils/errorHandler";
import FeedbackCard from "@/app/_components/FeedbackCard";
import ActiveUserDisplay from "@/app/_components/ActiveUserDisplay";
import { getUserReceivedRequests } from "@/prisma/services/friendService";
import UserSideNav from "./UserSideNav";
import ConversationsMenu from "./ConversationsMenu";

export default async function SideMenu() {
  const session = await auth();

  if (!session || !(session as ExtendedSession).userId)
    return redirect("/welcome");

  const user_id = (session as ExtendedSession).userId;

  const element: JSX.Element = await errorHandler(
    async () => {
      const conversations = await getUserConversations(
        (session as ExtendedSession).userId,
      );

      const notifications = await getUnreadForUserConversations(
        (session as ExtendedSession).userId,
        { type: true, conversation_id: true },
      );

      const friendRequests = await getUserReceivedRequests(
        (session as ExtendedSession).userId,
      );

      return (
        <ColumnWrapper
          className="h-full overflow-hidden p-0"
          justify="justify-start justify-items-start"
        >
          <UserSideNav friendRequests={friendRequests} />
          <ConversationsMenu
            user_id={user_id}
            conversations={conversations}
            notifications={notifications}
          />
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
