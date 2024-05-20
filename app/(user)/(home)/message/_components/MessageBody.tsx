import {
  deleteNotification,
  getUnreadForUserConversation,
} from "@/prisma/services/notificationService";
import {
  getConversationByParticipants,
  getMessages,
} from "../../../../../prisma/services/conversationService";
import MessageCell from "./MessageCell";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { Refresher } from "@/app/_components/wrappers/Refresher";
import errorHandler from "@/utils/errorHandler";
import FeedbackCard from "@/app/_components/FeedbackCard";

type MessageProps = {
  senderId: string;
  receiverId: string;
};

export default async function MessageBody({
  senderId,
  receiverId,
}: MessageProps) {
  const element: JSX.Element = await errorHandler(
    async () => {
      const conversation = await getConversationByParticipants(
        senderId,
        receiverId,
      );
      if (!conversation) return <p>No conversation</p>;

      const unread = await getUnreadForUserConversation(
        senderId,
        conversation.uid,
      );

      if (unread.length > 0) {
        setTimeout(() => {
          console.log("timeout");
          unread.forEach(async (notification) => {
            await deleteNotification(notification.id);
          });
        }, 4000);
      }

      const messages = await getMessages(conversation.uid);

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

      return (
        <ColumnWrapper justify="justify-end" className="w-full">
          {listMessages}
        </ColumnWrapper>
      );
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return element;
}
