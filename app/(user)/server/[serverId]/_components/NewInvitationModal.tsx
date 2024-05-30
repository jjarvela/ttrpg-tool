"use client";
import createServerInvitation from "@/actions/serverManagement/createServerInvitation";
import Button from "@/app/_components/Button";
import FeedbackCard from "@/app/_components/FeedbackCard";
import Checkbox from "@/app/_components/inputs/Checkbox";
import NumberInput from "@/app/_components/inputs/NumberInput";
import TextInput from "@/app/_components/inputs/TextInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import MaterialSymbolsLightCloseRounded from "@/public/icons/MaterialSymbolsLightCloseRounded";
import MaterialSymbolsLightContentCopyOutlineRounded from "@/public/icons/MaterialSymbolsLightContentCopyOutlineRounded";
import errorHandler from "@/utils/errorHandler";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NewInvitationModalProps = {
  refObject: React.RefObject<HTMLDialogElement>;
  serverId: string;
};

export default function NewInvitationModal({
  refObject,
  serverId,
}: NewInvitationModalProps) {
  const path = usePathname();

  const baseUrl = path.split("/")[0];

  const [hasMaxUses, setHasMaxUses] = useState(false);
  const [maxUses, setMaxUses] = useState(1);

  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  return (
    <dialog
      ref={refObject}
      className="bg-transparent backdrop:bg-black backdrop:bg-opacity-50"
    >
      <ColumnWrapper className="bg-color-dark text-color-default gap-0 rounded-lg border-[1px] border-black50 py-4">
        <MaterialSymbolsLightCloseRounded
          className="cursor-pointer self-end"
          onClick={() => refObject.current?.close()}
        />
        <ColumnWrapper className="px-8">
          <h5>Create invitation link</h5>
          <Checkbox
            id="toggle-max"
            label="Max uses"
            checked={hasMaxUses}
            onCheck={() => setHasMaxUses((prev) => !prev)}
          />
          <NumberInput
            value={maxUses}
            min={1}
            handleChange={(e) => setMaxUses(parseInt(e!.target.value))}
            disabled={!hasMaxUses}
          />
          <Button
            className="btn-primary"
            handleClick={async () => {
              const error: string | null = await errorHandler(
                async () => {
                  if (hasMaxUses) {
                    const invitation = await createServerInvitation(
                      serverId,
                      maxUses,
                    );
                    setLink(`/server/join/${invitation.id}`);
                  } else {
                    const invitation = await createServerInvitation(serverId);
                    setLink(`${baseUrl}/server/join/${invitation.id}`);
                  }
                },
                () => "Something went wrong.",
              );

              if (error) {
                setError(error);
                return;
              }
            }}
          >
            Create
          </Button>
          {link !== "" && (
            <TextInput
              readOnly
              value={link}
              endElement={
                <MaterialSymbolsLightContentCopyOutlineRounded
                  className="cursor-pointer"
                  onClick={() => {
                    try {
                      navigator.clipboard.writeText(link);
                      setCopySuccess(true);
                    } catch (e) {
                      setError("Copying failed. Please try again.");
                    }
                  }}
                />
              }
            />
          )}
          {copySuccess && (
            <FeedbackCard type="success" message="Copied to clipboard." />
          )}
          {error !== "" && <FeedbackCard type="error" message={error} />}
        </ColumnWrapper>
      </ColumnWrapper>
    </dialog>
  );
}
