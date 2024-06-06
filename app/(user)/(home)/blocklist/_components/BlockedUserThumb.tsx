"use client";

import unblockUser from "@/actions/userRelationshipManagement/unblockUser";
import Button from "@/app/_components/Button";
import ConfirmModal from "@/app/_components/ConfirmModal";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import { friendRequestEvent } from "@/socket";
import errorHandler from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";

export default function BlockedUserThumb({
  user,
}: {
  user: Omit<UserBasic, "person_status" | "socket_id">;
}) {
  const [isPending, startTransition] = useTransition();
  const confirmUnblockRef = useRef<HTMLDialogElement | null>(null);

  const router = useRouter();

  function handleUnblock() {
    startTransition(async () => {
      await errorHandler(async () => {
        await unblockUser(user.id);

        friendRequestEvent(user.id);

        router.refresh();
      });
    });
  }
  return (
    <RowWrapper>
      <h5>{user.screen_name || user.username}</h5>
      <p className="text-black50">{"@" + user.username}</p>
      <Button
        className="btn-secondary text-sm"
        disabled={isPending}
        onClick={() => confirmUnblockRef.current?.showModal()}
      >
        Unblock
      </Button>
      <ConfirmModal
        refObject={confirmUnblockRef}
        confirmText="Unblock User"
        onConfirm={() => {
          handleUnblock();
          confirmUnblockRef.current?.close();
        }}
      >
        <h4 className="my-4">Unblock {user.screen_name || user.username}?</h4>
        <p>
          This user will be able to message you and search for your profile
          again.
        </p>
      </ConfirmModal>
    </RowWrapper>
  );
}
