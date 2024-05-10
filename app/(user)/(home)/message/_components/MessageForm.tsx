"use client";

import addMessage from "../../../../../actions/directMessageActions/addMessage";
import { useRef, useState, useTransition } from "react";
import TextAreaInput from "../../../../_components/inputs/TextAreaInput";
import { useRouter } from "next/navigation";
import { sendMessage } from "@/socket";

type FormProp = {
  userId: string;
  receiverId: string;
};

export default function MessageForm({ userId, receiverId }: FormProp) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [textArea, setTextArea] = useState("");
  const [isPending, startTransition] = useTransition();

  const userIds = [userId, receiverId];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const router = useRouter();
  return (
    <form
      action={async (formData) => {
        startTransition(async () => {
          const message = await addMessage(userIds, formData);
          if (typeof message === "string") return;
          sendMessage(userId, message.uid, message.conversation_uid);
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
