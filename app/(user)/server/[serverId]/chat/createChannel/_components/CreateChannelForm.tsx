"use client";

import { useState, useTransition } from "react";
import createChannel from "@/actions/createChannel";
import TextInput from "@/app/_components/inputs/TextInput";
import RadioGroup from "@/app/_components/inputs/RadioGroup";

import Link from "next/link";
import Button from "@/app/_components/Button";
import DropdownSelection from "@/app/_components/inputs/DropdownSelection";
import { useRouter } from "next/navigation";
import FeedbackCard from "@/app/_components/FeedbackCard";

type CreateChannelProp = {
  serverId: string;
  listMembers: any[];
};
export default function CreateChannelForm({
  serverId,
  listMembers,
}: CreateChannelProp) {
  const [channelName, setChannelName] = useState("");
  const [typeSelected, setTypeSelected] = useState("text");
  const [users, setUsers] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const createChannelWithParams = createChannel.bind(null, serverId);

  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        formData.append("channeltypes", typeSelected);
        startTransition(async () => {
          const result = await createChannelWithParams(formData, users);
          if (typeof result === "string") {
            setError(result);
            return;
          }
          router.push(`/server/${serverId}/chat/${result?.channel_id}`);
          router.refresh();
        });
      }}
    >
      <h4>Channel name</h4>
      <TextInput
        placeholder="Channel name"
        value={channelName}
        disabled={isPending}
        onChange={(e) => setChannelName(e.target.value)}
        name="name"
        required
      />
      <h4>Channel type</h4>
      <RadioGroup
        groupName="channeltypes"
        values={["text", "voice"]}
        selected={typeSelected}
        setSelected={(s) => {
          setTypeSelected(s!.toString());
        }}
      />
      <h4>Add members to channel</h4>
      {listMembers.length > 0 ? (
        <DropdownSelection
          options={listMembers}
          onSelect={(s) => setUsers(s.map((item) => item.value.toString()))}
          multiple
        />
      ) : (
        <p>No users on this server</p>
      )}

      <div className="mt-6 flex justify-end gap-4">
        <Link href={`/server/${serverId}/chat`}>
          <Button className="btn-secondary" disabled={isPending}>
            Cancel
          </Button>
        </Link>
        <Button className="btn-primary" type="submit" disabled={isPending}>
          Create Channel
        </Button>
      </div>
      {error !== "" && <FeedbackCard type="error" message={error} />}
    </form>
  );
}
