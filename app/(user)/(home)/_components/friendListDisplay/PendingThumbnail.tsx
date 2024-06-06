"use client";

import getBlobSASUrl from "@/actions/getBlobSASUrl";
import declineFriendRequest from "@/actions/userRelationshipManagement/declineFriendRequest";
import Button from "@/app/_components/Button";
import ConfirmModal from "@/app/_components/ConfirmModal";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsProfile from "@/public/icons/MaterialSymbolsProfile";
import { friendRequestEvent } from "@/socket";
import errorHandler from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

export default function PendingThumbnail({
  request,
}: {
  request: FriendRequest;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const confirmRef = useRef<HTMLDialogElement | null>(null);

  const handleRescind = () => {
    startTransition(async () => {
      await errorHandler(async () => {
        await declineFriendRequest(request.id);

        friendRequestEvent(request.recipient_id);

        router.refresh();
      });
    });
  };

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (request.recipient.profile_image) {
      getBlobSASUrl(request.recipient.profile_image).then((result) =>
        setImageUrl(result),
      );
    }
  });

  return (
    <RowWrapper className="w-[90%] flex-wrap rounded-md bg-black25 px-4 py-4 lg:w-[55%] dark:bg-black75">
      <RowWrapper className="flex-grow">
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-black50"
          style={{ width: 40, height: 40 }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={request.recipient.username}
              className="min-h-[100%] min-w-[100%] rounded-full object-cover transition-all group-hover:rounded-md"
            />
          ) : (
            <MaterialSymbolsProfile width={40} height={40} />
          )}
        </div>
        <h4>{request.recipient.screen_name || request.recipient.username}</h4>
        <p className="text-black50">
          {"@"}
          {request.recipient.username}
        </p>
      </RowWrapper>
      <Button
        className="btn-secondary"
        onClick={() => confirmRef.current?.showModal()}
      >
        Delete friend request
      </Button>
      <ConfirmModal
        refObject={confirmRef}
        confirmText="Delete Request"
        onConfirm={() => {
          handleRescind();
          confirmRef.current?.close();
        }}
      >
        <h4 className="my-4">
          Rescind friend request sent to{" "}
          {request.recipient.screen_name || request.recipient.username}?
        </h4>
      </ConfirmModal>
    </RowWrapper>
  );
}
