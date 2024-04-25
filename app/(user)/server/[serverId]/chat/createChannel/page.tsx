"use client";

import { useState, useTransition } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import Main from "@/app/_components/wrappers/PageMain";
import createChannel from "@/actions/createChannel";
import TextInput from "@/app/_components/inputs/TextInput";
import RadioGroup from "@/app/_components/inputs/RadioGroup";
// import { getUsersExcept } from "@/prisma/services/userService";

export default function CreateChannel({ params }: { params: Params }) {
  const [channelName, setChannelName] = useState("");
  const [typeSelected, setTypeSelected] = useState("text");
  const [isPending, startTransition] = useTransition();

  const serverId = params.serverId;
  const createChannelWithParams = createChannel.bind(null, serverId);

  return (
    <form
      action={async (formData) => {
        startTransition(async () => {
          await createChannelWithParams(formData);
        });
      }}
    >
      <h1>Create new channel</h1>
      <h4>Channel Name</h4>
      <TextInput
        placeholder="Channel name"
        value={channelName}
        disabled={isPending}
        onChange={(e) => setChannelName(e.target.value)}
        name="name"
        required
      />
      <h4>Channel type</h4>
      {/* <RadioGroup
        groupName="channeltypes"
        values={["text", "voice"]}
        name="type"
        selected={typeSelected}
        setSelected={setTypeSelected}
      /> */}
      <h4>Add members to channel</h4>
    </form>
  );
}
