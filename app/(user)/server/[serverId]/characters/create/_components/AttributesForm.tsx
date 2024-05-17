import NumberInput from "@/app/_components/inputs/NumberInput";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import { useState } from "react";

export default function AttributesForm({
  attributes_names,
}: {
  attributes_names: string[];
}) {
  const [statList, setStatList] = useState<number[]>([]);

  return (
    <RowWrapper className="w-full flex-wrap gap-2">
      {attributes_names.map((item, index) => (
        <RowWrapper key={item + index}>
          <label htmlFor={item}>{item}</label>
          <NumberInput id={item} min={0} />
        </RowWrapper>
      ))}
    </RowWrapper>
  );
}
