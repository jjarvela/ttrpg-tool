import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import { getServerData } from "@/prisma/services/serverService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default async function ServerHome({ params }: { params: Params }) {
  const id = params.serverId;

  const server = await getServerData(id);

  if (!server || typeof server === "string") {
    return <FeedbackCard type="error" message="Something went wrong." />;
  }

  return (
    <Main className="mx-4">
      <h1>Hewwo</h1>
    </Main>
  );
}
