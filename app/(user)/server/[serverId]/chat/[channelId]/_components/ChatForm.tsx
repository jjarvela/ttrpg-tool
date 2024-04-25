"use client";

import { useRef, useState, useTransition } from "react";
import addChatMessage from "../../../../../../../actions/addChatMessage";
import getParticipants from "../../../../../../../actions/getParticipants";
import TextAreaInput from "../../../../../../_components/inputs/TextAreaInput";
import { useRouter } from "next/navigation";

import { sendMessage } from "@/socket";

type FormProp = {
  userId: string;
  channelId: string;
};

export default function ChatForm({ userId, channelId }: FormProp) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [textArea, setTextArea] = useState("");
  const [isPending, startTransition] = useTransition();

  const ids = [userId, channelId];
  const addMessageWithChannelId = addChatMessage.bind(null, ids);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };
  console.log("here");

  const router = useRouter();
  return (
    <form
      action={async (formData) => {
        startTransition(async () => {
          await addMessageWithChannelId(formData);
          const receivers = await getParticipants(channelId);
          console.log("all" + receivers);
          if (receivers && typeof receivers !== "string") {
            receivers.participants.forEach((element) => {
              if (userId !== element.participant_id) {
                console.log("receiver" + element.participant_id);
                sendMessage(element.participant_id);
              }
            });
          }
          ref.current?.focus();
          setTextArea("");
          router.refresh();
        });
      }}
      className=""
    >
      <TextAreaInput
        ref={ref}
        placeholder="Send message"
        disabled={isPending}
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
        rows={3}
        borderless={true}
        name="message"
        className=" bg-black25 dark:bg-black75"
        required
        onKeyDown={handleKeyDown}
      />
    </form>
  );
}
