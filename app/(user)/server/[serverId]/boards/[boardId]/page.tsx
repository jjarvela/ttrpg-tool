import { getGameBoard } from "@/prisma/services/gameBoardService";
import BoardFrame from "../_components/BoardFrame";
import Button from "@/app/_components/Button";
import { getServerData } from "@/prisma/services/serverService";
import errorHandler from "@/utils/errorHandler";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import ServerNotFound from "../../_components/ServerNotFound";
import Main from "@/app/_components/wrappers/PageMain";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { Fragment } from "react";

export default async function GameBoard({ params }: { params: Params }) {
  const server_id = params.serverId;

  const serverError: JSX.Element | null = await errorHandler(
    async () => {
      const server = await getServerData(server_id);
      return null;
    },
    () => {
      return <ServerNotFound />;
    },
  );

  if (serverError) {
    return serverError;
  }

  const board_id = params.boardId;

  const element: JSX.Element = await errorHandler(
    async () => {
      const board = await getGameBoard(board_id);

      return <BoardFrame board={board} />;
    },
    () => (
      <p className="text-warning">
        Something went wrong. Please refresh the page.
      </p>
    ),
  );

  return (
    <Fragment>
      <Link className="ml-4" href={`/server/${server_id}/boards`}>
        Return
      </Link>
      <ColumnWrapper align="content-start items-start w-[99%] h-full">
        {element}
      </ColumnWrapper>
    </Fragment>
  );
}
