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
};

export default function Discoverability({
  serverAuth,
  config,
}: ServerDiscoverabilityProps) {
  const [explorePermission, setExplorePermission] = useState(
    config.explorable || false,
  );
  const [searchPermission, setSearchPermission] = useState(
    config.searchable || false,
  );
  const [joinPermission, setJoinPermission] = useState<
    string | number | readonly string[] | undefined
  >(config.join_permission || "invitation link");

  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

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
              {
                searchable: searchPermission,
                explorable: explorePermission,
                join_permission: joinPermission
                  ? joinPermission.toString()
                  : undefined,
              },
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
          onByDefault={explorePermission}
          checked={explorePermission}
          onToggle={(checked) => setExplorePermission(checked)}
          disabled={isPending}
        />
        <ToggleInput
          id="server-search"
          label="Include server in search results"
          onByDefault={searchPermission}
          checked={searchPermission}
          onToggle={(checked) => setSearchPermission(checked)}
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
          selected={joinPermission}
          setSelected={setJoinPermission}
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
