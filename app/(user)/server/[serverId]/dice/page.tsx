
import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import { getServerData } from "@/prisma/services/serverService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ConfirmModal from "@/app/_components/ConfirmModal";
import DiceSelector from "./_components/DiceSelector";


export default async function ServerDice({ params }: { params: Params }) {
  const id = params.serverId;
  const server = await getServerData(id);

  if (!server || typeof server === "string") {
    return <FeedbackCard type="error" message="Something went wrong." />;
  }

  function throwHandler() {
    console.log("request throw result");
  }

  return (
    <Main className="mx-4">
      <DiceSelector />
    </Main>
  );
}
