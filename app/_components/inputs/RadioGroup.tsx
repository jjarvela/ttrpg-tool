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
  selectedColour?: string; //css class
  required?: boolean;
};

export default function RadioGroup({
  groupName,
  values,
  selected,
  setSelected,
  className,
  labelStyle,
  selectedColour,
}: RadioGroupProps) {
  const [isInvalid, setIsInvalid] = useState(false);

  return (
    <div className={twMerge("flex", className)}>
      {values.map((value, index) => (
        <RadioInput
          key={groupName + value}
          name={groupName}
          value={value}
          selected={selected}
          setSelected={setSelected}
          setIsInvalid={setIsInvalid}
          className={className}
          labelStyle={labelStyle}
          selectedColour={selectedColour}
        />
      ))}
      {isInvalid && (
        <span className="text-warning">This field is required</span>
      )}
    </div>
  );
}
