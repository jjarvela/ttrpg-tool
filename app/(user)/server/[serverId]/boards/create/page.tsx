import Main from "@/app/_components/wrappers/PageMain";
import { getServerData } from "@/prisma/services/serverService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import errorHandler from "@/utils/errorHandler";
import ServerNotFound from "../../_components/ServerNotFound";
import CreateBoard from "./_components/CreateBoard";

export default async function ServerBoardCreate({
  params,
}: {
  params: Params;
}) {
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
    <Main className="w-full px-4 pb-4">
      <h1>Create Gameboard</h1>
      <CreateBoard server_id={id} />
    </Main>
  );
}
