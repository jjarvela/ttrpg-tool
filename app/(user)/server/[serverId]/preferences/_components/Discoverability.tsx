"use client";
import editServerDiscoverability from "@/actions/serverManagement/editServerDiscoverability";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import RadioGroup from "@/app/_components/inputs/RadioGroup";
import ToggleInput from "@/app/_components/inputs/ToggleInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

type ServerDiscoverabilityProps = {
  serverAuth: ServerAuth;
  config: ServerConfig;
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
};

export default function Discoverability({
  serverAuth,
  config,
  isPending,
  startTransition,
}: ServerDiscoverabilityProps) {
  const [discoverability, setDiscoverability] = useState({
    explorable: config.explorable,
    searchable: config.searchable,
    join_permission: config.join_permission,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (formRef.current) {
      const isValid = formRef.current.checkValidity();
      if (!isValid) {
        formRef.current.reportValidity();
      } else {
        startTransition(async () => {
          try {
            const result = await editServerDiscoverability(
              serverAuth.member_id,
              config,
              discoverability,
            );
            setSuccess("success");
            router.refresh();
          } catch (e) {
            setError((e as Error).message);
            return;
          }
        });
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <ColumnWrapper id="discoverability" align="items-start" className="mb-8">
        <h4 className="mt-5">Server visibility</h4>
        <ToggleInput
          id="server-explore"
          label="Include server in explore"
          onByDefault={discoverability.explorable}
          checked={discoverability.explorable}
          onToggle={(checked) =>
            setDiscoverability({ ...discoverability, explorable: checked })
          }
          disabled={isPending}
        />
        <ToggleInput
          id="server-search"
          label="Include server in search results"
          onByDefault={discoverability.searchable}
          checked={discoverability.searchable}
          onToggle={(checked) =>
            setDiscoverability({ ...discoverability, searchable: checked })
          }
          disabled={isPending}
        />

        <h4 className="mt-5">Join permissions</h4>
        <small>
          Configure the rules for how non-members who find the server can join
        </small>
        <RadioGroup
          className="my-4 flex-col gap-2"
          groupName="join-permissions"
          labels={[
            "Only through direct link to an invitation",
            "If there is an available unlimited use invitation",
            "If there is any type of available invitation",
          ]}
          values={["invitation link", "unlimited invitation", "any invitation"]}
          selected={discoverability.join_permission}
          setSelected={(s) =>
            setDiscoverability({
              ...discoverability,
              join_permission: s!.toString(),
            })
          }
          disabled={isPending}
        />

        <Button className="btn-primary" type="submit">
          Save
        </Button>
        {success !== "" && (
          <FeedbackCard type="success" message="Settings have been saved" />
        )}
        {error !== "" && <FeedbackCard type="error" message={error} />}
      </ColumnWrapper>
    </form>
  );
}
