import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import { getServerCharacters } from "@/prisma/services/characterService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";

export default async function ServerCharacters({ params }: { params: Params }) {
  const id = params.serverId;

  try {
    const characters = await getServerCharacters(id);
    return (
      <Main className="w-full px-4">
        <h1>Characters</h1>
        <RowWrapper justify="justify-between">
          <Link href={`/server/${id}/characters/create`}>
            <Button className="btn-primary">Create new</Button>
          </Link>
          <Link href={`/server/${id}/characters/configure`}>
            <Button className="btn-secondary">Configuration</Button>
          </Link>
        </RowWrapper>
      </Main>
    );
  } catch (e) {
    return <FeedbackCard type="error" message="Something went wrong." />;
  }
}
