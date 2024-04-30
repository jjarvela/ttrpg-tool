"use client";

import updateMemberRole from "@/actions/serverMemberManagement/updateMemberRole";
import Button from "@/app/_components/Button";
import ConfirmModal from "@/app/_components/ConfirmModal";
import FeedbackCard from "@/app/_components/FeedbackCard";
import DropdownSelection from "@/app/_components/inputs/DropdownSelection";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightCloseRounded from "@/public/icons/MaterialSymbolsLightCloseRounded";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function RoleEdit({
  serverAuth,
  member,
}: {
  serverAuth: ServerAuth;
  member: {
    id: number;
    server_id: string;
    member_id: string;
    role: string;
    nickname: string | null;
    icon: string | null;
    user: {
      username: string;
      screen_name: string | null;
      timezone: string | null;
      share_timezone: boolean | null;
      profile_image: string | null;
      socket_id: string | null;
      person_status: string | null;
    };
  };
}) {
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState<Option[]>([
    { value: member.role, label: member.role },
  ]);
  const [error, setError] = useState("");

  const memberName =
    member.nickname || member.user.screen_name || member.user.username;

  function disableOptions() {
    if (serverAuth.role === "member") {
      return [
        { value: "admin", label: "admin" },
        { value: "moderator", label: "moderator" },
        { value: "member", label: "member" },
      ];
    }
    if (serverAuth.role !== "admin") {
      [{ value: "moderator", label: "moderator" }];
    }

    if (serverAuth.role === "admin" && member.role === "admin") {
      return [
        { value: "moderator", label: "moderator" },
        { value: "member", label: "member" },
      ];
    }

    return undefined;
  }

  const confirmRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  if (!editMode)
    return (
      <Button
        className="btn-secondary self-end"
        onClick={() => setEditMode(true)}
      >
        Edit member roles
      </Button>
    );

  return (
    <>
      <RowWrapper
        className="w-full"
        justify="justify-items-between justify-between"
      >
        <div className="w-80">
          <DropdownSelection
            arrowClass="h-[120%]"
            defaultSelected={selected}
            options={[
              { value: "admin", label: "admin" },
              { value: "moderator", label: "moderator" },
              { value: "member", label: "member" },
            ]}
            disabledOptions={disableOptions()}
            onSelect={(s) => {
              setSelected(s);
              confirmRef.current?.showModal();
            }}
          />
        </div>
        <MaterialSymbolsLightCloseRounded
          className="cursor-pointer pb-2 text-xl"
          onClick={() => setEditMode(false)}
        />
      </RowWrapper>
      <ConfirmModal
        refObject={confirmRef}
        onConfirm={async () => {
          const result = await updateMemberRole(
            member.server_id,
            member.member_id,
            serverAuth.member_id,
            String(selected[0].value),
          );
          if (typeof result === "string") {
            setError(result);
            return;
          }
          confirmRef.current?.close();
          router.refresh();
        }}
      >
        {serverAuth.role === "admin" && selected[0].label === "admin" ? (
          <>
            <p>Only one user can be server admin. </p>
            <p>{`Are you sure you wish to promote ${memberName} to admin? `}</p>
            <p className="mb-4">Your role will be changed to moderator.</p>
          </>
        ) : (
          <p className="mb-4">{`Set ${memberName}'s role to ${selected[0].label}?`}</p>
        )}
        {error !== "" && <FeedbackCard type="error" message={error} />}
      </ConfirmModal>
    </>
  );
}
