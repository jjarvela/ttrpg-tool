import { getUnreadForUserConversation } from "@/prisma/services/notificationService";
import {
  getConversationByParticipants,
  getMessages,
} from "../../../../../prisma/services/conversationService";
import MessageCell from "./MessageCell";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";

type MessageProps = {
  senderId: string;
  receiverId: string;
};

export default async function MessageBody({
  senderId,
  receiverId,
}: MessageProps) {
  const conversation = await getConversationByParticipants(
    senderId,
    receiverId,
  );

  if (!conversation || typeof conversation === "string") return <p></p>;

  const unread = await getUnreadForUserConversation(senderId, conversation.uid);

  const messages = await getMessages(conversation.uid);
  if (typeof messages !== "string") {
    const listMessages = messages.map((message) => {
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
  }
}
