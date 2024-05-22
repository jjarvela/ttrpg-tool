"use client";

import Button from "@/app/_components/Button";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import { Fragment } from "react";

export default function BaseSelect({
  characterSelector,
  selectNew,
}: {
  characterSelector: React.RefObject<HTMLDialogElement>;
  selectNew: () => void;
}) {
  return (
    <RowWrapper>
      <Button
        className="btn-secondary"
        onClick={() => characterSelector.current?.showModal()}
      >
        Select from existing
      </Button>
      <Button className="btn-secondary" onClick={() => selectNew()}>
        Create new
      </Button>
    </RowWrapper>
  );
}
