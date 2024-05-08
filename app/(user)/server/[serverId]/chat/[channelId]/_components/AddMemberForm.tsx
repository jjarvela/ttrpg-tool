"use client";

import { useState, useTransition } from "react";
import addChannelMember from "@/actions/addChannelMember";
import TextInput from "@/app/_components/inputs/TextInput";
import RadioGroup from "@/app/_components/inputs/RadioGroup";

import Link from "next/link";
import Button from "@/app/_components/Button";
import DropdownSelection from "@/app/_components/inputs/DropdownSelection";
import { useRouter } from "next/navigation";
import FeedbackCard from "@/app/_components/FeedbackCard";

type CreateChannelProp = {
  serverId: string;
  channelId: string;
  notChannelMembers: any[];
};
export default function AddMemberForm({
  serverId,
  channelId,
  notChannelMembers,
}: CreateChannelProp) {
  const [users, setUsers] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  //const createChannelWithParams = createChannel.bind(null, serverId);

  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        //formData.append("channeltypes", typeSelected);
        startTransition(async () => {
          console.log(formData);
          const result = await addChannelMember(formData, users, channelId);
          if (typeof result === "string") {
            setError(result);
            return;
          }
          router.push(`/server/${serverId}/chat/${channelId}`);
          router.refresh();
        });
      }}
    >
      {notChannelMembers.length > 0 ? (
        <DropdownSelection
          options={notChannelMembers}
          onSelect={(s) => setUsers(s.map((item) => item.value.toString()))}
          multiple
        />
      ) : (
        <p>No more members on this server</p>
      )}

      <div className="mt-6 flex justify-end gap-4">
        <Link href={`/server/${serverId}/chat/${channelId}`}>
          <Button className="btn-secondary" disabled={isPending}>
            Cancel
          </Button>
        </Link>
        <Button className="btn-primary" type="submit" disabled={isPending}>
          Add members
        </Button>
      </div>
      {error !== "" && <FeedbackCard type="error" message={error} />}
    </form>
  );
}
