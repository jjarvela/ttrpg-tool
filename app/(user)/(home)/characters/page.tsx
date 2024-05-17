import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import { auth } from "@/auth";
import { getUserCharacterBases } from "@/prisma/services/characterService";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UserCharacters() {
  const session = await auth();

  if (!session) redirect("/login");

  try {
    const characters = await getUserCharacterBases(
      (session as ExtendedSession).userId,
      {
        server_stats: { server: { id: true, server_name: true, image: true } },
      },
    );

    return (
      <Main className="mb-4 w-full px-4">
        <Link href={`/characters/create`} className="my-4">
          <Button className="btn-primary">Create new</Button>
        </Link>
        {characters.length < 1 && (
          <p>You have not created any characters yet.</p>
        )}
      </Main>
    );
  } catch (e) {
    return <FeedbackCard type="error" message="Something went wrong." />;
  }
}
