import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { auth } from "../../../../../../auth";
import { redirect } from "next/navigation";
import FeedbackCard from "../../../../../_components/FeedbackCard";
import ChatForm from "./_components/ChatForm";
import Main from "@/app/_components/wrappers/PageMain";
import { getChannelByChannelId } from "@/prisma/services/channelService";
import errorHandler from "@/utils/errorHandler";

export default async function FormLayout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) return redirect("/welcome");

  const userId = (session as ExtendedSession).userId;

  const channelId = params.channelId;

  const element: JSX.Element = await errorHandler(
    async () => {
      const channel = await getChannelByChannelId(channelId);

      const channeltype = channel.channel_type;

      if (channeltype === "text") {
        return (
          <div className="flex w-full flex-grow flex-col justify-end overflow-hidden">
            {children}
            <ChatForm userId={userId} channelId={channelId} />
          </div>
        );
      } else {
        return <p>Voice channels are not implemented yet.</p>;
      }
    },
    () => (
      <p className="text-warning">Something went wrong. Please try again.</p>
    ),
  );
  return element;
}
