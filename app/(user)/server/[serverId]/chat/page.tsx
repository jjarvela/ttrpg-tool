import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import { getServerData } from "@/prisma/services/serverService";
import errorHandler from "@/utils/errorHandler";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default async function ServerChat({ params }: { params: Params }) {
  const id = params.serverId;

  const element: JSX.Element = await errorHandler(
    async () => {
      const server = await getServerData(id);
      return <h5>Channels</h5>;
    },
    () => {
      return <FeedbackCard type="error" message="Something went wrong." />;
    },
  );

  return <Main className="px-4">{element}</Main>;
}
