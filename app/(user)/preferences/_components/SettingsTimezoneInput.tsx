"use client";

import DropdownSelection from "@/app/_components/inputs/DropdownSelection";
import { validMomentTimezones } from "@/utils/timezones";
import { useRouter } from "next/navigation";

type Option = { label: string; value: string | number | boolean };

export default function SettingsTimezoneInput({
  timezone,
  editInfo,
}: {
  timezone?: string;
  editInfo: (selected: Option[]) => void | Promise<string | undefined>;
}) {
  const router = useRouter();

  return (
    <DropdownSelection
      id="timezone"
      defaultSelected={timezone ? [{ label: timezone, value: timezone }] : []}
      className="w-full text-lg"
      arrowClass="text-2xl py-[0.54rem] px-2"
      startElement={
        <label
          htmlFor="timezone"
          className="me-4 bg-black25 px-4 py-2 text-lg dark:bg-black75"
        >
          Timezone
        </label>
      }
      options={validMomentTimezones.map((item) => {
        return {
          value: item,
          label: item,
        };
      })}
      onSelect={async (s) => {
        const result = await editInfo(s);
        if (result) {
          return;
        }
        router.refresh();
      }}
    />
  );
}
