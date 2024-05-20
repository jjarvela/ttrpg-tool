import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import { getServerData } from "@/prisma/services/serverService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import errorHandler from "@/utils/errorHandler";
import ServerNotFound from "../_components/ServerNotFound";

export default async function ServerBoards({ params }: { params: Params }) {
  const id = params.serverId;

  const serverError: JSX.Element | null = await errorHandler(
    async () => {
      const server = await getServerData(id);
      return null;
    },
    () => {
      return <ServerNotFound />;
    },
  );

  if (serverError) {
    return serverError;
  }

  return (
    <Main className="px-4">
      <h1>Hewwo</h1>
    </Main>
  );
}
