import Button from "@/app/_components/Button";
import Main from "@/app/_components/wrappers/PageMain";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import errorHandler from "@/utils/errorHandler";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import ChannelThumb from "./_components/ChannelThumb";
import { getChannels } from "@/prisma/services/channelService";

export default async function ServerChat({ params }: { params: Params }) {
  const id = params.serverId;
  const channelId = params.channelId;

  const element: JSX.Element = await errorHandler(
    async () => {
      const channels = await getChannels(id);
      if (channels.length < 1) {
        return <p>This server has no chat channels yet.</p>;
      }

      return (
        <RowWrapper className="flex-wrap">
          {channels.map((channel) => {
            return <ChannelThumb key={channel.uid} channel={channel} />;
          })}
        </RowWrapper>
      );
    },
    () => (
      <p className="text-warning">
        Something went wrong. Please refresh the page.
      </p>
    ),
  );

  return (
    <Main className="gap-4 px-4">
      <Link href={`/server/${id}/chat/createChannel`}>
        <Button className="btn-primary">Create new channel</Button>
      </Link>
      {element}
    </Main>
  );
}
