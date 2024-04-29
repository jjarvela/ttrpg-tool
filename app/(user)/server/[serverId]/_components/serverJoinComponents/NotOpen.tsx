"use client";

import Button from "@/app/_components/Button";
import Main from "@/app/_components/wrappers/PageMain";
import { useRouter } from "next/navigation";

export default function NotOpen({ reason }: { reason: string }) {
  const router = useRouter();
  return (
    <Main className="items-center justify-center gap-4">
      <h1>This server cannot be joined at this time.</h1>
      <h5>{reason}</h5>
      <Button
        onClick={() => router.push("/server/explore")}
        className="btn-secondary"
      >
        Back to Explore
      </Button>
    </Main>
  );
}
