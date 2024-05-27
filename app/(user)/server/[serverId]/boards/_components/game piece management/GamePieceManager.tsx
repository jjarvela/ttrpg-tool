import FeedbackCard from "@/app/_components/FeedbackCard";
import { auth } from "@/auth";
import { getUserServerCharacters } from "@/prisma/services/characterService";
import errorHandler from "@/utils/errorHandler";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { redirect } from "next/navigation";
import GamePieceManagerClientWrapper from "./GamePieceManagerClientWrapper";
import { Fragment } from "react";
import Link from "next/link";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import GamePieceCreator from "./GamePieceCreator";

export default async function GamePieceManager({
  server_id,
}: {
  server_id: string;
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

      return (
        <Fragment>
          {characters.length > 0 ? (
            <GamePieceCreator characters={characters} />
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
