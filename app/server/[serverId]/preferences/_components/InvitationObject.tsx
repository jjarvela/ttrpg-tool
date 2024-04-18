"use client";
import deleteServerInvitation from "@/actions/serverManagement/deleteServerInvitation";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightCheckCircleOutlineRounded from "@/public/icons/MaterialSymbolsLightCheckCircleOutlineRounded";
import MaterialSymbolsLightContentCopyOutlineRounded from "@/public/icons/MaterialSymbolsLightContentCopyOutlineRounded";
import MaterialSymbolsLightDeleteOutlineRounded from "@/public/icons/MaterialSymbolsLightDeleteOutlineRounded";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

export default function InvitationObject({
  invitation,
}: {
  invitation: {
    id: string;
    server_id: string;
    expires: string;
    used_count: number;
    max_uses: number | null;
    protected: boolean;
  };
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <Fragment>
      <RowWrapper>
        <ColumnWrapper>
          <p>Expires: {new Date(invitation.expires).toLocaleString()}</p>
          {invitation.max_uses && (
            <small>
              Uses: {invitation.used_count}/{invitation.max_uses}
            </small>
          )}
        </ColumnWrapper>
        <MaterialSymbolsLightDeleteOutlineRounded
          className="cursor-pointer"
          onClick={async () => {
            setError("");
            const result = await deleteServerInvitation(invitation.id);
            if (typeof result === "string") setError(result);
            else router.refresh();
          }}
        />
        {new Date() < new Date(invitation.expires) &&
          (!invitation.max_uses ||
            invitation.used_count < invitation.max_uses) && (
            <a
              className="flex cursor-pointer flex-row gap-2"
              onClick={() => {
                setError("");
                setCopySuccess(false);
                try {
                  navigator.clipboard.writeText(
                    `${baseUrl}/server/join/${invitation.id}`,
                  );
                  setCopySuccess(true);
                } catch (e) {
                  setError("Could not copy link. Please try again.");
                }
              }}
            >
              <span>Copy link</span>{" "}
              <MaterialSymbolsLightContentCopyOutlineRounded className="self-center" />
              {copySuccess && (
                <MaterialSymbolsLightCheckCircleOutlineRounded className="self-center text-primary opacity-80" />
              )}
            </a>
          )}
      </RowWrapper>
      {error !== "" && (
        <small className="text-warning">Something went wrong!</small>
      )}
    </Fragment>
  );
}
