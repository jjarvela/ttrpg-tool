"use client";

import joinServer from "@/actions/joinServer";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { redirect } from "next/navigation";
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
  async function handleJoin() {
    const result = await joinServer(invitationId);
    if (typeof result === "string") setError(result);
    else redirect(`/server/${result.server_id}`);
  }
  return (
    <ColumnWrapper>
      <h1>You have been invited to join {serverName}.</h1>
      <Button
        className="btn-primary"
        disabled={isPending}
        handleClick={() => startTransition(async () => await handleJoin())}
      >
        Join
      </Button>
      {error !== "" && <FeedbackCard type="error" message={error} />}
    </ColumnWrapper>
  );
}