"use client";
import deleteServerInvitation from "@/actions/deleteServerInvitation";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
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
  return (
    <Fragment>
      <RowWrapper>
        <ColumnWrapper>
          <p>Expries: {invitation.expires}</p>
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
      </RowWrapper>
      {error !== "" && (
        <small className="text-warning">Something went wrong!</small>
      )}
    </Fragment>
  );
}
