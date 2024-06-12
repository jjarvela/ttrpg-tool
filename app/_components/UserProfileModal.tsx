"use client";

import getBlobSASUrl from "@/actions/getBlobSASUrl";
import MaterialSymbolsProfile from "@/public/icons/MaterialSymbolsProfile";
import { useState, useEffect, Fragment } from "react";
import RowWrapper from "./wrappers/RowWrapper";
import ColumnWrapper from "./wrappers/ColumnWrapper";
import getUserDetails from "@/actions/userManagement/getUserDetails";
import MutualServer from "./MutualServer";
import MaterialSymbolsLightCloseRounded from "@/public/icons/MaterialSymbolsLightCloseRounded";
import MaterialSymbolsAndroidMessagesOutline from "@/public/icons/MaterialSymbolsAndroidMessagesOutline";
import Link from "next/link";
import BlockedUserThumb from "../(user)/(home)/blocklist/_components/BlockedUserThumb";

type UserProfile = {
  user: Omit<
    UserDetailed,
    "person_status" | "socket_id" | "timezone" | "share_timezone"
  >;
  isSelf: boolean;
  isFriend: boolean;
  dm_permission: string;
  onMyBlocklist: boolean;
  onTheirBlocklist: boolean;
};

export default function UserProfileModal({
  refObject,
  user_id,
  optionsElement,
}: {
  refObject: React.RefObject<HTMLDialogElement>;
  user_id: string;
  optionsElement: React.ReactNode;
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [mutualServers, setMutualServers] = useState<
    { id: string; server_name: string; image: string | null }[]
  >([]);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      getUserDetails(user_id)
        .then((result) => {
          setUser(result.user);
          setMutualServers(result.mutualServers);
          if (result.user.user.profile_image) {
            getBlobSASUrl(result.user.user.profile_image).then((result) =>
              setImageUrl(result),
            );
          }
        })
        .catch(() => setError("Something went wrong."));
    }
  });

  const element: JSX.Element = selectContent();

  function selectContent() {
    if (!user) {
      return (
        <Fragment>
          <RowWrapper className="flex-grow">
            <div
              className="flex h-12 w-12 flex-shrink-0 animate-pulse items-center justify-center overflow-hidden rounded-full bg-black50"
              style={{ width: 40, height: 40 }}
            ></div>
            <h4 className="h-4 w-10 animate-pulse bg-black50"></h4>
            <p className="h-3 w-8 animate-pulse bg-black50"></p>
          </RowWrapper>
          <RowWrapper>
            <p className="h-8 w-10 animate-pulse bg-black50"></p>
            <p className="h-8 w-10 animate-pulse bg-black50"></p>
          </RowWrapper>
        </Fragment>
      );
    }

    if (user.onMyBlocklist) {
      return (
        <RowWrapper>
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-black50"
            style={{ width: 40, height: 40 }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={user.user.username}
                className="min-h-[100%] min-w-[100%] rounded-full object-cover transition-all group-hover:rounded-md"
              />
            ) : (
              <MaterialSymbolsProfile width={80} height={80} />
            )}
          </div>
          <BlockedUserThumb user={user.user} />
        </RowWrapper>
      );
    }

    return (
      <Fragment>
        <RowWrapper
          breakPoint="sm"
          align="content-start items-start"
          className="w-full border-b-[1px] border-black50 pb-2"
        >
          <RowWrapper breakPoint="xs" className="flex-grow">
            <div
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-black50"
              style={{ width: 40, height: 40 }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={user.user.username}
                  className="min-h-[100%] min-w-[100%] rounded-full object-cover transition-all group-hover:rounded-md"
                />
              ) : (
                <MaterialSymbolsProfile width={80} height={80} />
              )}
            </div>
            <h2>{user.user.screen_name || user.user.username}</h2>
            <h5 className="text-black50">
              {"@"}
              {user.user.username}
            </h5>
          </RowWrapper>
          {user.isFriend ? (
            optionsElement
          ) : (
            <RowWrapper breakPoint="xs" className="gap-0">
              {optionsElement}{" "}
              {!user.isSelf &&
                !user.onTheirBlocklist &&
                user.dm_permission === "anyone" && (
                  <Link href={`/message/${user_id}`}>
                    <MaterialSymbolsAndroidMessagesOutline className="flex-shrink-0 text-2xl" />
                  </Link>
                )}
              {!user.isSelf &&
                !user.onTheirBlocklist &&
                user.dm_permission === "servers" &&
                mutualServers.length > 0 && (
                  <Link href={`/message/${user_id}`}>
                    <MaterialSymbolsAndroidMessagesOutline className="flex-shrink-0 text-2xl" />
                  </Link>
                )}
            </RowWrapper>
          )}
        </RowWrapper>
        <RowWrapper breakPoint="md" className="w-full flex-grow">
          <p className="my-4 h-[80%] w-full flex-grow text-wrap border-black50 pl-2 md:max-w-[50%] md:border-r-[1px]">
            {user.user.person_description}
          </p>
          {!user.isSelf && (
            <ColumnWrapper
              align="items-start"
              justify="justify-start justify-items-start"
              className="h-[80%] w-full pl-4 pt-0 md:max-w-[50%]"
            >
              <h4>Mutual servers</h4>
              {mutualServers.length < 1 ? (
                <p>You and this user have no mutual servers.</p>
              ) : (
                <RowWrapper className="flex-wrap">
                  {mutualServers.map((server) => (
                    <MutualServer key={server.id} server={server} />
                  ))}
                </RowWrapper>
              )}
            </ColumnWrapper>
          )}
        </RowWrapper>
      </Fragment>
    );
  }

  return (
    <dialog
      ref={refObject}
      className="h-full w-full bg-transparent backdrop:bg-black backdrop:bg-opacity-50"
    >
      <ColumnWrapper className="bg-color-dark text-color-default m-auto h-full w-[90%] gap-2 overflow-y-auto overflow-x-hidden rounded-lg border-[1px] border-black50 px-8 py-4 md:h-[75%] lg:w-[60%]">
        <MaterialSymbolsLightCloseRounded
          className="flex-shrink-0 cursor-pointer self-end text-2xl"
          onClick={() => refObject.current?.close()}
        />
        {element}
      </ColumnWrapper>
    </dialog>
  );
}
