"use client";

import getBlobSASUrl from "@/actions/getBlobSASUrl";
import acceptFriendRequest from "@/actions/userRelationshipManagement/acceptFriendRequest";
import declineFriendRequest from "@/actions/userRelationshipManagement/declineFriendRequest";
import ConfirmModal from "@/app/_components/ConfirmModal";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightCheckRounded from "@/public/icons/MaterialSymbolsLightCheckRounded";
import MaterialSymbolsLightCloseRounded from "@/public/icons/MaterialSymbolsLightCloseRounded";
import MaterialSymbolsProfile from "@/public/icons/MaterialSymbolsProfile";
import { friendRequestEvent } from "@/socket";
import errorHandler from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState, useTransition } from "react";

export default function ReceivedRequestObject({
  request,
}: {
  request: FriendRequest;
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  useEffect(() => {
    if (request.requester.profile_image) {
      getBlobSASUrl(request.requester.profile_image).then((result) =>
        setImageUrl(result),
      );
    }
  });

  const router = useRouter();

  const confirmAcceptRef = useRef<HTMLDialogElement | null>(null);
  const confirmDeclineRef = useRef<HTMLDialogElement | null>(null);

  function handleAccept() {
    startTransition(async () => {
      await errorHandler(
        async () => {
          await acceptFriendRequest(request.id);

          friendRequestEvent(request.requester_id);

          router.refresh();
        },
        (e) => setError((e as Error).message),
      );
    });
  }

  function handleDecline() {
    startTransition(async () => {
      await errorHandler(
        async () => {
          await declineFriendRequest(request.id);

          friendRequestEvent(request.requester_id);

          router.refresh();
        },
        (e) => setError((e as Error).message),
      );
    });
  }

  return (
    <Fragment>
      <RowWrapper
        justify="justify-start"
        className="card-back w-[90%] flex-wrap rounded-lg border-[1px] border-black50 px-4 py-2 lg:w-[55%]"
      >
        <RowWrapper className="flex-grow">
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-black50"
            style={{ width: 40, height: 40 }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={request.requester.username}
                className="min-h-[100%] min-w-[100%] rounded-full object-cover transition-all group-hover:rounded-md"
              />
            ) : (
              <MaterialSymbolsProfile width={40} height={40} />
            )}
          </div>
          <h4>{request.requester.screen_name || request.requester.username}</h4>
          <p className="text-black50">
            {"@"}
            {request.requester.username}
          </p>
        </RowWrapper>
        <RowWrapper>
          <MaterialSymbolsLightCheckRounded
            className="flex-shrink-0 cursor-pointer text-2xl"
            onClick={() => confirmAcceptRef.current?.showModal()}
          />
          <MaterialSymbolsLightCloseRounded
            className="flex-shrink-0 cursor-pointer text-2xl"
            onClick={() => confirmDeclineRef.current?.showModal()}
          />
        </RowWrapper>
      </RowWrapper>
      <ConfirmModal
        refObject={confirmAcceptRef}
        confirmText="Accept Friend Request"
        onConfirm={() => {
          handleAccept();
          confirmAcceptRef.current?.close();
        }}
      >
        <h4 className="my-4">
          Accept friend request from{" "}
          {request.requester.screen_name || request.requester.username}?
        </h4>
      </ConfirmModal>
      <ConfirmModal
        refObject={confirmDeclineRef}
        confirmText="Decline friend request"
        confirmButtonClass="bg-warning active:bg-warning"
        onConfirm={() => {
          handleDecline();
          confirmDeclineRef.current?.close();
        }}
      >
        <h4 className="my-4">
          Decline friend request from{" "}
          {request.requester.screen_name || request.requester.username}?
        </h4>
      </ConfirmModal>
    </Fragment>
  );
}
