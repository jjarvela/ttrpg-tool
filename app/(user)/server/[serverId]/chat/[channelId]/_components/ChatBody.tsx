import { getMessagesByChannelId } from "../../../../../../../prisma/services/conversationService";
import MessageCell from "@/app/(user)/(home)/message/_components/MessageCell";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";

type ChatProps = {
  channelId: string;
};

export default async function ChatBody({ channelId }: ChatProps) {
  const channelMessages = await getMessagesByChannelId(channelId);
  if (channelMessages && typeof channelMessages !== "string") {
    const messages = channelMessages.messages;
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

    return <ColumnWrapper className="w-full">{listMessages}</ColumnWrapper>;
  }
}
