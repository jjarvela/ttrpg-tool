"use client";

import Button from "@/app/_components/Button";
import BaseForm from "@/app/_components/character/BaseForm";
import TextAreaInput from "@/app/_components/inputs/TextAreaInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import Link from "next/link";
import { useTransition } from "react";

export default function UserCharacterForm({ user_id }: { user_id: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <ColumnWrapper className="h-[90%] w-full">
      <BaseForm isPending={isPending} />
      <label htmlFor="notes">Notes</label>
      <TextAreaInput className="h-[40%] w-full" id="notes" />
      <RowWrapper justify="justify-center" className="w-full ">
        <Button className="btn-primary">Save</Button>
        <Link href="/characters">
          <Button className="btn-secondary">Cancel</Button>
        </Link>
      </RowWrapper>
    </ColumnWrapper>
  );
}
