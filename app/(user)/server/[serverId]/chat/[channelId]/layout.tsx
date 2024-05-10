import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { auth } from "../../../../../../auth";
import { redirect } from "next/navigation";
import FeedbackCard from "../../../../../_components/FeedbackCard";
import ChatForm from "./_components/ChatForm";
import Main from "@/app/_components/wrappers/PageMain";
import { getChannelByChannelId } from "@/prisma/services/channelService";

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

  const channel = await getChannelByChannelId(channelId);

  if (!channel || typeof channel === "string") {
    return (
      <FeedbackCard
        type="error"
        message="Something went wrong. Please try again."
      />
    );
  } else {
    const channeltype = channel.channel_type;

    return (
      <>
        {channeltype === "text" ? (
          <div className="flex w-full flex-grow flex-col">
            {children}
            <ChatForm userId={userId} channelId={channelId} />
          </div>
        ) : (
          <Main className="mx-4">
            <h4></h4>
          </Main>
        )}
      </>
    );
  }
}
