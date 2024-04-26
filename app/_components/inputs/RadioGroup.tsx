import { twMerge } from "tailwind-merge";
import RadioInput from "./RadioInput";
import { useState } from "react";

type RadioGroupProps = {
  groupName: string;
  labels?: Array<string>;
  values: Array<string | number | readonly string[] | undefined>;
  selected: string | number | readonly string[] | undefined;
  setSelected: React.Dispatch<
    React.SetStateAction<string | number | readonly string[] | undefined>
  >;
  className?: string;
  labelStyle?: string;
  radioStyle?: { radioBg: string; selectedColour?: string; radioSize?: string };
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
};

export default function RadioGroup({
  groupName,
  labels,
  values,
  selected,
  setSelected,
  className,
  labelStyle,
  radioStyle,
  readonly,
  disabled,
}: RadioGroupProps) {
  const [isInvalid, setIsInvalid] = useState(false);

  return (
    <div className={twMerge("flex", className)}>
      {values.map((value, index) => (
        <RadioInput
          key={groupName + value}
          name={groupName}
          label={labels ? labels[index] : undefined}
          value={value}
          selected={selected}
          setSelected={setSelected}
          setIsInvalid={setIsInvalid}
          className={className}
          labelStyle={labelStyle}
          radioStyle={radioStyle}
          readOnly={readonly}
          disabled={disabled}
        />
      ))}
      {isInvalid && (
        <span className="text-warning">This field is required</span>
      )}
    </div>
  );
}
