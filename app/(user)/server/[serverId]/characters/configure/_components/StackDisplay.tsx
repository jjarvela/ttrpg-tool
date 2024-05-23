import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";

export default function StackDisplay({
  title,
  description,
  stats,
}: {
  title: string;
  description: string;
  stats: string[];
}) {
  return (
    <ColumnWrapper align="items-center content-center" className="w-full">
      <h4>{title}</h4>
      <p>{description}</p>
      <RowWrapper
        justify="justify-center justify-items-center"
        className="w-full flex-wrap border-b-[1px] border-black25 dark:border-black75"
      >
        {stats.map((item, index) => (
          <h5
            key={item + index}
            className="mb-4 min-w-[10%] bg-black25 px-4 py-2 text-center dark:bg-black75"
          >
            {item}
          </h5>
        ))}
      </RowWrapper>
    </ColumnWrapper>
  );
}
