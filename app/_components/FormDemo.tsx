"use client";

import NumberInput from "./inputs/NumberInput";
import PasswordInput from "./inputs/PasswordInput";
import TextAreaInput from "./inputs/TextAreaInput";
import TextInput from "./inputs/TextInput";

export default function FormDemo() {
  return (
    <form className="flex flex-col gap-2">
      <TextInput onChange={(e) => console.log(e.target.value)} />
      <PasswordInput onChange={(e) => console.log(e.target.value)} />
      <NumberInput
        min={1}
        max={5}
        handleChange={(e) => console.log(e!.target.value)}
      />
      <TextAreaInput
        placeholder="Your text here..."
        onChange={(e) => console.log(e.target.value)}
        maxLength={100}
        rows={5}
        borderless
        className=" bg-black25 dark:bg-black75"
      />
    </form>
  );
}
