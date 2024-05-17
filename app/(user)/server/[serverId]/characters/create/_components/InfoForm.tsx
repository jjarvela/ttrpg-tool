import NumberInput from "@/app/_components/inputs/NumberInput";
import TextInput from "@/app/_components/inputs/TextInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";

export default function InfoForm({ isPending }: { isPending: boolean }) {
  return (
    <ColumnWrapper>
      <RowWrapper>
        <label htmlFor="character-class">Class</label>
        <TextInput id="character-class" />
      </RowWrapper>
      <RowWrapper>
        <label htmlFor="level">Lv</label>
        <NumberInput />
      </RowWrapper>
      <RowWrapper>
        <label htmlFor="experience">Exp.</label>
        <NumberInput id="exp" min={0} /> /
        <NumberInput id="exp-max" min={0} />
      </RowWrapper>
    </ColumnWrapper>
  );
}
