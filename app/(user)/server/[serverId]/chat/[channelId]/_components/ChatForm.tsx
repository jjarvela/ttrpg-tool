"use client";

import { useRef, useState, useTransition, useEffect } from "react";
import addChatMessage from "@/actions/addChatMessage";
import TextAreaInput from "@/app/_components/inputs/TextAreaInput";
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
  const [formSubmitted, setFormSubmitted] = useState(false);

  const ids = [userId, channelId];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (formSubmitted) {
      if (ref.current) {
        ref.current.focus();
      }
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  return (
    <form
      action={async (formData) => {
        startTransition(async () => {
          const message = await addChatMessage(ids, formData);
          if (typeof message === "string") return;
          sendMessage(userId, message.uid, message.conversation_uid);
          setTextArea("");
          router.refresh();
        });
        setFormSubmitted(true);
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
