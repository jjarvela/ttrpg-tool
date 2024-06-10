"use client";

import joinServer from "@/actions/serverMemberManagement/joinServer";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import MaterialSymbolsLightInfoOutlineRounded from "@/public/icons/MaterialSymbolsLightInfoOutlineRounded";
import errorHandler from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function NotProtected({
  invitationId,
  serverName,
  hasBlocked,
}: {
  invitationId: string;
  serverName: string;
  hasBlocked: boolean;
}) {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  async function handleJoin() {
    const error = await errorHandler(
      async () => {
        const result = await joinServer(invitationId);
        router.push(`/server/${result.server_id}`);
        router.refresh();
      },
      (e) => (e as Error).message,
    );
    if (error) {
      setError(error);
      return;
    }
  }
  return (
    <Main className="items-center justify-center">
      <h1>You have been invited to join {serverName}.</h1>
      {hasBlocked && (
        <h4 className="flex gap-2 text-warning">
          <MaterialSymbolsLightInfoOutlineRounded className="text-2xl" /> One or
          more members of this server are on your blocklist.
        </h4>
      )}
      <Button
        className="btn-primary"
        disabled={isPending}
        handleClick={() => startTransition(async () => await handleJoin())}
      >
        Join
      </Button>
      {error !== "" && <FeedbackCard type="error" message={error} />}
    </Main>
  );
}
