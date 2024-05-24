import NumberInput from "@/app/_components/inputs/NumberInput";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";

export default function StatsForm({
  stats_names,
  stats,
  setStats,
  isPending,
}: {
  stats_names: string[];
  stats: number[];
  setStats: React.Dispatch<React.SetStateAction<number[]>>;
  isPending: boolean;
}) {
  return (
    <RowWrapper className="w-full flex-wrap gap-2">
      {stats_names.map((item, index) => (
        <RowWrapper key={item + index}>
          <label htmlFor={item}>{item}</label>
          <NumberInput
            id={item}
            min={0}
            value={stats[index]}
            handleChange={(e) => {
              const newStats = stats.map((stat, stat_index) => {
                if (stat_index === index && e) {
                  return parseInt(e.target.value);
                } else {
                  return stat;
                }
              });

              setStats(newStats);
            }}
            disabled={isPending}
          />
        </RowWrapper>
      ))}
    </RowWrapper>
  );
}
