"use client";

import { useRef, useState } from "react";
import DropdownSelection from "./inputs/DropdownSelection";
import NumberInput from "./inputs/NumberInput";
import PasswordInput from "./inputs/PasswordInput";
import RadioGroup from "./inputs/RadioGroup";
import TextAreaInput from "./inputs/TextAreaInput";
import TextInput from "./inputs/TextInput";
import ToggleInput from "./inputs/ToggleInput";
import Checkbox from "./inputs/Checkbox";
import FileInput from "./inputs/FileInput";
import axios from "axios";
import postUpload from "@/utils/postUpload";
import FeedbackCard from "./FeedbackCard";

export default function FormDemo() {
  const [radioSelected, setRadioSelected] = useState<
    string | number | readonly string[] | undefined
  >("1");
  const [textarea, setTextArea] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <form className="flex flex-col gap-2">
      <TextInput onChange={(e) => console.log(e.target.value)} />
      <PasswordInput onChange={(e) => console.log(e.target.value)} />
      <NumberInput
        step={0.25}
        handleChange={(e) => console.log(e!.target.value)}
      />
      <NumberInput
        min={3}
        max={20}
        handleChange={(e) => console.log(e!.target.value)}
      />
      <TextAreaInput
        placeholder="Your text here..."
        value={textarea}
        onChange={(e) => setTextArea(e.target.value)}
        maxLength={100}
        rows={5}
        borderless
        className=" bg-black25 dark:bg-black75"
      />

      <ToggleInput id="demo-toggle" />
      <ToggleInput
        id="demo-toggle2"
        label="This is a demo toggle"
        checkedColour="bg-accent"
      />

      <DropdownSelection
        options={[
          { label: "One", value: 1 },
          { label: "Two", value: 2 },
          { label: "Three", value: 3 },
        ]}
        required
        onSelect={(s) => console.log(s)}
      />
      <DropdownSelection
        options={[
          { label: "One", value: 1 },
          { label: "Two", value: 2 },
          { label: "Three", value: 3 },
        ]}
        defaultSelected={[
          { label: "Two", value: 2 },
          { label: "Three", value: 3 },
        ]}
        onSelect={(s) => console.log(s)}
        multiple
      />

      <RadioGroup
        groupName="demo-radio"
        values={["1", "2", "3"]}
        selected={radioSelected}
        setSelected={setRadioSelected}
      />

      <Checkbox id="demo-check" label="This is a demo checkbox" />

      <FileInput id="test" labelElement={<p>Upload a file</p>} ref={fileRef} />
      <button
        type="button"
        onClick={async (e) => {
          e.preventDefault();
          if (fileRef.current?.files) {
            try {
              postUpload(fileRef.current.files[0]);
            } catch (error) {
              console.log(error);
            }
          }
        }}
      >
        Upload
      </button>

      <button>Submit</button>
    </form>
  );
}
