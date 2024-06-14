"use client";

import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import { serverUpdateEvent } from "@/socket";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

export default function ToggleCreation({
  server_id,
  enable,
  disable,
}: {
  server_id: string;
  enable?: () => Promise<void>;
  disable?: () => Promise<void>;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <Fragment>
      <Button
        onClick={async () => {
          try {
            enable && (await enable());
            disable && (await disable());
            serverUpdateEvent(server_id);

            router.refresh();
          } catch (e) {
            setError("Something went wrong.");
          }
        }}
        className="btn-secondary w-max self-center"
      >
        {enable ? "Enable character creation" : "Disable character creation"}
      </Button>
      {error !== "" && <FeedbackCard type="error" message={error} />}
    </Fragment>
  );
}
