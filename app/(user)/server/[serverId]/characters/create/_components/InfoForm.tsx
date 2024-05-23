import NumberInput from "@/app/_components/inputs/NumberInput";
import TextInput from "@/app/_components/inputs/TextInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";

export default function InfoForm({
  isPending,
  info,
  setInfo,
}: {
  isPending: boolean;
  info: {
    class: string;
    level: number;
    experience: number;
    experience_max: number;
    skills: string;
    items: string;
  };
  setInfo: React.Dispatch<
    React.SetStateAction<{
      class: string;
      level: number;
      experience: number;
      experience_max: number;
      skills: string;
      items: string;
    }>
  >;
}) {
  return (
    <ColumnWrapper>
      <RowWrapper>
        <label htmlFor="character-class">Class</label>
        <TextInput
          id="character-class"
          value={info.class}
          onChange={(e) => setInfo({ ...info, class: e.target.value })}
          disabled={isPending}
        />
      </RowWrapper>
      <RowWrapper>
        <label htmlFor="level">Lv</label>
        <NumberInput
          id="level"
          value={info.level}
          min={1}
          handleChange={(e) =>
            e && setInfo({ ...info, level: parseInt(e.target.value) })
          }
          disabled={isPending}
        />
      </RowWrapper>
      <RowWrapper>
        <label htmlFor="exp">Exp.</label>
        <NumberInput
          id="exp"
          min={0}
          max={info.experience_max}
          value={info.experience}
          handleChange={(e) =>
            e && setInfo({ ...info, experience: parseInt(e.target.value) })
          }
          disabled={isPending}
        />{" "}
        /
        <NumberInput
          id="exp-max"
          min={1}
          value={info.experience_max}
          handleChange={(e) =>
            e && setInfo({ ...info, experience_max: parseInt(e.target.value) })
          }
          disabled={isPending}
        />
      </RowWrapper>
    </ColumnWrapper>
  );
}
