import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Main from "../../_components/wrappers/PageMain";
import { getServerData } from "../../../prisma/services/serverService";
import FeedbackCard from "../../_components/FeedbackCard";

export default async function ServerHome({ params }: { params: Params }) {
  const id = params.serverId[0];

  const server = await getServerData(id);

  if (!server || typeof server === "string") {
    return <FeedbackCard type="error" message="Something went wrong." />;
  }

  return (
    <Main className="ps-48 pt-4 md:ps-60 lg:pt-20">
      <h1>Hewwo</h1>
    </Main>
  );
}
