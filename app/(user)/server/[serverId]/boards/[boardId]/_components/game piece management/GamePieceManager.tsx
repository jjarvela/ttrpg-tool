import FeedbackCard from "@/app/_components/FeedbackCard";
import { auth } from "@/auth";
import { getUserServerCharacters } from "@/prisma/services/characterService";
import errorHandler from "@/utils/errorHandler";
import { redirect } from "next/navigation";
import GamePieceManagerClientWrapper from "./GamePieceManagerClientWrapper";
import { Fragment } from "react";
import Link from "next/link";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import GamePieceCreator from "./GamePieceCreator";
import { getUserPiecesForBoard } from "@/prisma/services/gameBoardService";

export default async function GamePieceManager({
  server_id,
  board_id,
}: {
  server_id: string;
  board_id: string;
}) {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  const element: JSX.Element = await errorHandler(
    async () => {
      const characters = await getUserServerCharacters(
        server_id,
        (session as ExtendedSession).userId,
        {
          select: {
            id: true,
            class: true,
            level: true,
          },
          base: {
            owner_id: true,
            name: true,
            image: true,
          },
        },
      );

      const existing = await getUserPiecesForBoard(
        board_id,
        (session as ExtendedSession).userId,
      );

      return (
        <Fragment>
          {characters.length > 0 ? (
            <GamePieceCreator
              characters={characters}
              existing={existing}
              board_id={board_id}
            />
          ) : (
            <ColumnWrapper className="w-full">
              <p>You have no characters on this server.</p>
              <Link
                className="text-accent"
                href={`/server/${server_id}/characters`}
              >
                Go to characters
              </Link>
            </ColumnWrapper>
          )}
        </Fragment>
      );
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return (
    <GamePieceManagerClientWrapper>{element}</GamePieceManagerClientWrapper>
  );
}
