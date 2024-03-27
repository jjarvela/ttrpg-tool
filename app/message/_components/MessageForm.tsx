import { useState } from "react";
import TextAreaInput from "../../_components/inputs/TextAreaInput";
import Button from "../../_components/Button";

export default function MessageForm() {
  const [textArea, setTextArea] = useState("");

  return (
    <>
      <form className="flex">
        <TextAreaInput
          placeholder="Send message"
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
          rows={1}
          borderless={true}
          className=" bg-black25 dark:bg-black75"
        />
        <Button type="submit" className="btn-primary">
          Send
        </Button>
      </form>
    </>
  );
}
