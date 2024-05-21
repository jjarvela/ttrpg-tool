import NumberInput from "@/app/_components/inputs/NumberInput";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";

export default function VitalsForm({
  vitals_names,
  vitals,
  setVitals,
}: {
  vitals_names: string[];
  vitals: {
    vitals: number[];
    vitals_max: number[];
  };
  setVitals: React.Dispatch<
    React.SetStateAction<{
      vitals: number[];
      vitals_max: number[];
    }>
  >;
}) {
  return (
    <RowWrapper className="w-full flex-wrap gap-2">
      {vitals_names.map((item, index) => (
        <RowWrapper key={item + index}>
          <label htmlFor={item}>{item}</label>
          <NumberInput id={item} min={0} /> /
          <NumberInput id={item + "-max"} min={0} />
        </RowWrapper>
      ))}
    </RowWrapper>
  );
}
