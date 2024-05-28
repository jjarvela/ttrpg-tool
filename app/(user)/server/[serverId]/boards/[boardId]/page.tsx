import {
  getBoardPieces,
  getGameBoard,
} from "@/prisma/services/gameBoardService";
import BoardFrame from "../_components/BoardFrame";
import { getServerData } from "@/prisma/services/serverService";
import errorHandler from "@/utils/errorHandler";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import ServerNotFound from "../../_components/ServerNotFound";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { Fragment } from "react";
import GamePieceManager from "../_components/game piece management/GamePieceManager";
import MaterialSymbolsLightChevronLeftRounded from "@/public/icons/MaterialSymbolsLightChevronLeftRounded";
import getBlobSASUrl from "@/actions/getBlobSASUrl";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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

  const session = await auth();

  if (!session) redirect(`/login?srv=${server_id}`);

  const board_id = params.boardId;

  const element: JSX.Element = await errorHandler(
    async () => {
      const board = await getGameBoard(board_id);

      const pieces = await getBoardPieces(board_id);

      if (board.background) {
        const imageUrl = await getBlobSASUrl(board.background);
        return (
          <BoardFrame
            currentUser={(session as ExtendedSession).userId}
            imageUrl={imageUrl}
            board={board}
            pieces={pieces}
          />
        );
      }

      return (
        <BoardFrame
          currentUser={(session as ExtendedSession).userId}
          board={board}
          pieces={pieces}
        />
      );
    },
    () => (
      <p className="text-warning">
        Something went wrong. Please refresh the page.
      </p>
    ),
  );

  return (
    <Fragment>
      <Link
        className="card-back flex h-[2.4rem] w-full content-center items-center gap-2 pl-4"
        href={`/server/${server_id}/boards`}
      >
        <MaterialSymbolsLightChevronLeftRounded className="flex-shrink-0 text-2xl" />
        <span>Return</span>
      </Link>
      <ColumnWrapper align="content-start items-start w-full h-full overflow-hidden p-0">
        {element}
        <GamePieceManager server_id={server_id} board_id={board_id} />
      </ColumnWrapper>
    </Fragment>
  );
}
