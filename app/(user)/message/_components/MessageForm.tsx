"use client";

import { useState } from "react";
import addMessage from "../../../../actions/addMessage";
import { useFormState } from "react-dom";
import TextAreaInput from "../../../_components/inputs/TextAreaInput";
import Button from "../../../_components/Button";

const initialState = {
  message: "",
};

export default function MessageForm() {
  const [textArea, setTextArea] = useState("");
  // const [state, formAction] = useFormState(addMessage, initialState);

  return (
    <form action={addMessage} className="flex flex-col">
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
