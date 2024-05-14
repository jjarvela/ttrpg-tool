import { getMessagesByChannelId } from "../../../../../../../prisma/services/conversationService";
import MessageCell from "@/app/(user)/(home)/message/_components/MessageCell";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { Refresher } from "@/app/_components/wrappers/Refresher";
import { auth } from "@/auth";
import {
  deleteNotification,
  getUnreadForUserChannel,
} from "@/prisma/services/notificationService";
import { redirect } from "next/navigation";

type ChatProps = {
  channelId: string;
};

export default async function ChatBody({ channelId }: ChatProps) {
  const session = await auth();

  if (!session) return redirect("/welcome");

  const channelMessages = await getMessagesByChannelId(channelId);

  const unread = await getUnreadForUserChannel(
    (session as ExtendedSession).userId,
    channelId,
  );

  if (typeof unread !== "string" && unread.length > 0) {
    setTimeout(() => {
      console.log("timeout");
      unread.forEach(async (notification) => {
        await deleteNotification(notification.id);
      });
    }, 4000);
  }

  if (channelMessages && typeof channelMessages !== "string") {
    const messages = channelMessages.messages;
    const listMessages = messages.map((message) => {
      if (
        typeof unread !== "string" &&
        unread.length > 0 &&
        message.uid === unread[0].message_id
      ) {
        return (
          <Refresher key={message.uid} array={unread}>
            <div className="w-full border-t-[1px] border-primary text-center text-primary">
              New messages
            </div>
            <MessageCell
              key={message.uid}
              sender_id={message.sender_id}
              message={message.message}
              created_at={message.created_at}
            />
          </Refresher>
        );
      }
      return (
        <MessageCell
          key={message.uid}
          sender_id={message.sender_id}
          message={message.message}
          created_at={message.created_at}
        />
      );
    });

    return <ColumnWrapper className="w-full">{listMessages}</ColumnWrapper>;
  }
}
