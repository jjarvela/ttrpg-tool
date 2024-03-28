import { twMerge } from "tailwind-merge";
import RadioInput from "./RadioInput";
import { useState } from "react";

type RadioGroupProps = {
  groupName: string;
  values: Array<string | number | readonly string[] | undefined>;
  selected: string | number | readonly string[] | undefined;
  setSelected: React.Dispatch<
    React.SetStateAction<string | number | readonly string[] | undefined>
  >;
  className?: string;
  labelStyle?: string;
  radioStyle?: { radioBg: string; selectedColour?: string; radioSize?: string };
  required?: boolean;
};

export default function RadioGroup({
  groupName,
  values,
  selected,
  setSelected,
  className,
  labelStyle,
  radioStyle,
}: RadioGroupProps) {
  const [isInvalid, setIsInvalid] = useState(false);

  return (
    <div className={twMerge("flex", className)}>
      {values.map((value) => (
        <RadioInput
          key={groupName + value}
          name={groupName}
          value={value}
          selected={selected}
          setSelected={setSelected}
          setIsInvalid={setIsInvalid}
          className={className}
          labelStyle={labelStyle}
          radioStyle={radioStyle}
        />
      ))}
      {isInvalid && (
        <span className="text-warning">This field is required</span>
      )}
    </div>
  );
}
