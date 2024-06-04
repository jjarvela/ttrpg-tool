import Main from "@/app/_components/wrappers/PageMain";
import { getServerData } from "@/prisma/services/serverService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import errorHandler from "@/utils/errorHandler";
import ServerNotFound from "../_components/ServerNotFound";
import { getServerBoards } from "@/prisma/services/gameBoardService";
import Link from "next/link";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import Button from "@/app/_components/Button";
import BoardThumb from "./_components/BoardThumb";

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

  const element: JSX.Element = await errorHandler(
    async () => {
      const boards = await getServerBoards(id);

      if (boards.length < 1) {
        return <p>This server has no game boards yet.</p>;
      }

      return (
        <RowWrapper className="flex-wrap">
          {boards.map((board) => {
            return <BoardThumb key={board.id} board={board} />;
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
      <Link href={`/server/${id}/boards/create`}>
        <Button className="btn-primary">Create new</Button>
      </Link>
      {element}
    </Main>
  );
}
