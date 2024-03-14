"use client";

import DropdownSelection from "./inputs/DropdownSelection";
import NumberInput from "./inputs/NumberInput";
import PasswordInput from "./inputs/PasswordInput";
import TextAreaInput from "./inputs/TextAreaInput";
import TextInput from "./inputs/TextInput";
import ToggleInput from "./inputs/ToggleInput";

export default function FormDemo() {
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
        onChange={(e) => console.log(e.target.value)}
        maxLength={100}
        rows={5}
        borderless
        className=" bg-black25 dark:bg-black75"
      />

      <ToggleInput id="demo-toggle"/>
      <ToggleInput id="demo-toggle2" label="This is a demo toggle" checkedColour="bg-accent"/>

      <DropdownSelection options={[{label: "One", value: 1}, {label: "Two", value: 2}, {label: "Three", value: 3}]} />
      <DropdownSelection options={[{label: "One", value: 1}, {label: "Two", value: 2}, {label: "Three", value: 3}]} defaultSelected={[{label: "Two", value: 2}, {label: "Three", value: 3}]} multiple />
    </form>
  );
}
