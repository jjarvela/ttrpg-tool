"use client";

import joinServer from "@/actions/serverMemberManagement/joinServer";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import Main from "@/app/_components/wrappers/PageMain";
import errorHandler from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function NotProtected({
  invitationId,
  serverName,
}: {
  invitationId: string;
  serverName: string;
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
