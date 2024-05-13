"use client";

import TextAreaInput from "@/app/_components/inputs/TextAreaInput";
import TextInput from "@/app/_components/inputs/TextInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";

export default function CharacterForm() {
  return (
    <ColumnWrapper className="w-full">
      <RowWrapper>
        <label htmlFor="character-name">Character name</label>
        <TextInput id="character-name" />
      </RowWrapper>

      <label htmlFor="character-skills">Skills</label>
      <TextAreaInput id="character-skills" />

      <label htmlFor="character-inventory">Inventory</label>
      <TextAreaInput id="character-inventory" />
    </ColumnWrapper>
  );
}
