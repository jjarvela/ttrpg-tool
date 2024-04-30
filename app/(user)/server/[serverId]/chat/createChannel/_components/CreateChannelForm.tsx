"use client";

import { useState, useTransition } from "react";
import createChannel from "@/actions/createChannel";
import TextInput from "@/app/_components/inputs/TextInput";
import RadioGroup from "@/app/_components/inputs/RadioGroup";

import Link from "next/link";
import Button from "@/app/_components/Button";
import DropdownSelection from "@/app/_components/inputs/DropdownSelection";

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
  const [isPending, startTransition] = useTransition();
  const createChannelWithParams = createChannel.bind(null, serverId);

  //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     e.currentTarget.form?.requestSubmit();
  //   };

  return (
    <form
      action={async (formData) => {
        startTransition(async () => {
          await createChannelWithParams(formData);
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
          onSelect={(s) => console.log(s)}
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
    </form>
  );
}
