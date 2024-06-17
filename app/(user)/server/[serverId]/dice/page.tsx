
import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import { getConversationByChannelId } from "@/prisma/services/conversationService";
import { getServerData } from "@/prisma/services/serverService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useSearchParams } from "next/navigation";
import DiceSelector from "./_components/DiceSelector";
import { auth } from "@/auth";

export default async function ServerDice({ params, searchParams }:
  {
    params: Params,
    searchParams?: [key: string]
  }) {

  const id = params.serverId;
  const server = await getServerData(id);
  const session = await auth();



  if (!server || typeof server === "string") {
    return <FeedbackCard type="error" message="Something went wrong." />;
  }


  return (
    <Main className="mx-4">
      <DiceSelector />
    </Main>
  );
}
