"use client";

import { useRef, useState } from "react";
import addMessage from "../../../../actions/addMessage";
import { useFormState } from "react-dom";
import TextAreaInput from "../../../_components/inputs/TextAreaInput";
import Button from "../../../_components/Button";

export default function MessageForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [textArea, setTextArea] = useState("");

  return (
    <form
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        await addMessage(formData);
      }}
      className="flex flex-col"
    >
      <TextAreaInput
        placeholder="Send message"
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
        rows={1}
        borderless={true}
        name="message"
        className=" bg-black25 dark:bg-black75"
      />
      <Button type="submit" className="btn-primary">
        Send
      </Button>
    </form>
  );
}
