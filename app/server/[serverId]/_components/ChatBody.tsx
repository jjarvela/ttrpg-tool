import { getMessages } from "../../../../prisma/services/conversationService";
import { getChannelData } from "../../../../prisma/services/channelService";
import MessageCell from "@/app/(user)/message/_components/MessageCell";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";

type ChatProps = {
  channelId: string;
};

export default async function ChatBody({ channelId }: ChatProps) {
  const channelData = await getChannelData(channelId);
  return <></>;
}
