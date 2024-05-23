import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import CharacterBaseDisplay from "@/app/_components/character/CharacterBaseDisplay";
import Main from "@/app/_components/wrappers/PageMain";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import { auth } from "@/auth";
import { getUserCharacterBases } from "@/prisma/services/characterService";
import errorHandler from "@/utils/errorHandler";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UserCharacters() {
  const session = await auth();

  if (!session) redirect("/login");

  const element: JSX.Element = await errorHandler(
    async () => {
      const characters = await getUserCharacterBases(
        (session as ExtendedSession).userId,
        {
          server_stats: { server_id: true },
        },
      );

      if (characters.length < 1) {
        return <p>You have not created any characters yet.</p>;
      }
      return characters.map((character) => (
        <CharacterBaseDisplay key={character.id} character={character} />
      ));
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return (
    <Main className="w-full px-4 pb-8">
      <Link href={`/characters/create`} className="my-4">
        <Button className="btn-primary">Create new</Button>
      </Link>
      <RowWrapper className="flex-wrap">{element}</RowWrapper>
    </Main>
  );
}
