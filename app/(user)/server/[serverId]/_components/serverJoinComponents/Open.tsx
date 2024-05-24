"use client";
import joinServer from "@/actions/serverMemberManagement/joinServer";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import PasswordInput from "@/app/_components/inputs/PasswordInput";
import Main from "@/app/_components/wrappers/PageMain";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import errorHandler from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function Open({
  server_name,
  needsPassword,
  invitation_id,
}: {
  server_name: string;
  needsPassword: boolean | null;
  invitation_id: string;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  async function handleJoin() {
    const error: string | null = await errorHandler(
      async () => {
        const result = await joinServer(invitation_id, password);
        router.push(`/server/${result.server_id}`);
      },
      (e) => (e as Error).message,
    );
    if (error) setError(error);
    else {
      router.refresh();
    }
  }
  return (
    <Main className="items-center justify-center gap-4">
      <h1>Would you like to join {server_name}?</h1>
      {needsPassword && (
        <>
          <h5>This server requires a password to join.</h5>
          <PasswordInput
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                startTransition(async () => {
                  await handleJoin();
                });
              }
            }}
            disabled={isPending}
          />
        </>
      )}
      <RowWrapper>
        <Button
          onClick={() => {
            startTransition(async () => {
              await handleJoin();
            });
          }}
          className="btn-primary"
          disabled={isPending}
        >
          Join
        </Button>
        <Button
          onClick={() => {
            router.push("/server/explore");
          }}
          className="btn-secondary"
          disabled={isPending}
        >
          Back to Explore
        </Button>
      </RowWrapper>
      {error !== "" && <FeedbackCard type="error" message={error} />}
    </Main>
  );
}
