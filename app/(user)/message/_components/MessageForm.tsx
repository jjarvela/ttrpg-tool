"use client";

import { useRef, useState } from "react";
import addMessage from "../../../../actions/addMessage";
import TextAreaInput from "../../../_components/inputs/TextAreaInput";

type FormProp = {
  userId: string;
  receiverId: string;
};

export default function MessageForm({ userId, receiverId }: FormProp) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [textArea, setTextArea] = useState("");

  const userIds = [userId, receiverId];
  const addMessageWithUserIds = addMessage.bind(null, userIds);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <form
      action={async (formData) => {
        await addMessageWithUserIds(formData);
        ref.current?.focus();
        setTextArea("");
      }}
      className=""
    >
      <TextAreaInput
        ref={ref}
        placeholder="Send message"
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
