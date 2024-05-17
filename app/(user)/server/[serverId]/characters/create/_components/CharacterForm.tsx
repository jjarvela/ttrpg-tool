"use client";

import TextAreaInput from "@/app/_components/inputs/TextAreaInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import VitalsForm from "./VitalsForm";
import AttributesForm from "./AttributesForm";
import StaticsForm from "./StaticsForm";
import BaseForm from "../../../../../../_components/character/BaseForm";
import { useTransition } from "react";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import InfoForm from "./InfoForm";

export default function CharacterForm({
  user_id,
  config,
}: {
  user_id: string;
  config: CharacterConfig;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <ColumnWrapper align="items-start" className="w-full gap-6">
      <RowWrapper
        breakPoint="lg"
        id="information"
        justify="justify-items-start w-full"
        className="lg:gap-8"
      >
        <BaseForm isPending={isPending} />
        <InfoForm isPending={isPending} />
      </RowWrapper>

      <VitalsForm vitals_names={config.vitals_names} />

      <ColumnWrapper align="items-start" id="stats" className="w-full p-0">
        <h5>Stats</h5>
        <AttributesForm attributes_names={config.attributes_names} />
        <StaticsForm statics_names={config.statics_names} />
      </ColumnWrapper>

      <ColumnWrapper id="skills-and-inventory" className="w-[60%]">
        <label htmlFor="character-skills">Skills</label>
        <TextAreaInput id="character-skills" className="w-[90%]" />

        <label htmlFor="character-inventory">Inventory</label>
        <TextAreaInput id="character-inventory" className="w-[90%]" />
      </ColumnWrapper>
    </ColumnWrapper>
  );
}
