import NumberInput from "@/app/_components/inputs/NumberInput";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";

export default function VitalsForm({
  vitals_names,
  vitals,
  setVitals,
  isPending,
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
  isPending: boolean;
}) {
  return (
    <RowWrapper className="w-full flex-wrap gap-2">
      {vitals_names.map((item, index) => (
        <RowWrapper key={item + index}>
          <label htmlFor={item}>{item}</label>
          <NumberInput
            id={item}
            min={0}
            max={vitals.vitals_max[index]}
            value={vitals.vitals[index]}
            handleChange={(e) => {
              const newVitals = vitals.vitals.map((stat, stat_index) => {
                if (stat_index === index && e) {
                  return parseInt(e.target.value);
                } else {
                  return stat;
                }
              });

              setVitals({ ...vitals, vitals: newVitals });
            }}
            disabled={isPending}
          />{" "}
          /
          <NumberInput
            id={item + "-max"}
            min={0}
            value={vitals.vitals_max[index]}
            handleChange={(e) => {
              const newVitals = vitals.vitals_max.map((stat, stat_index) => {
                if (stat_index === index && e) {
                  return parseInt(e.target.value);
                } else {
                  return stat;
                }
              });

              setVitals({ ...vitals, vitals_max: newVitals });
            }}
            disabled={isPending}
          />
        </RowWrapper>
      ))}
    </RowWrapper>
  );
}
