"use client";

import getBlobSASUrl from "@/actions/getBlobSASUrl";
import MaterialSymbolsProfile from "@/public/icons/MaterialSymbolsProfile";
import { useState, useEffect } from "react";
import RowWrapper from "./wrappers/RowWrapper";
import ColumnWrapper from "./wrappers/ColumnWrapper";
import getUserDetails from "@/actions/userManagement/getUserDetails";
import MutualServer from "./MutualServer";
import MaterialSymbolsLightCloseRounded from "@/public/icons/MaterialSymbolsLightCloseRounded";
import MaterialSymbolsAndroidMessagesOutline from "@/public/icons/MaterialSymbolsAndroidMessagesOutline";
import Link from "next/link";

type UserProfile = {
  user: Omit<
    UserDetailed,
    "person_status" | "socket_id" | "timezone" | "share_timezone"
  >;
  isSelf: boolean;
  isFriend: boolean;
  dm_permission: string;
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

  if (!user) {
    return (
      <dialog
        ref={refObject}
        className="bg-transparent backdrop:bg-black backdrop:bg-opacity-50"
      >
        <ColumnWrapper className="bg-color-dark text-color-default gap-0 rounded-lg border-[1px] border-black50 px-8 py-4">
          <RowWrapper>
            <RowWrapper className="flex-grow">
              <div
                className="flex h-12 w-12 flex-shrink-0 animate-pulse items-center justify-center overflow-hidden rounded-full bg-black50"
                style={{ width: 40, height: 40 }}
              ></div>
              <h4 className="h-4 w-10 animate-pulse bg-black50"></h4>
              <p className="h-3 w-8 animate-pulse bg-black50"></p>
            </RowWrapper>
            <MaterialSymbolsLightCloseRounded
              className="flex-shrink-0 cursor-pointer"
              onClick={() => refObject.current?.close()}
            />
          </RowWrapper>
        </ColumnWrapper>
      </dialog>
    );
  }
  return (
    <dialog
      ref={refObject}
      className="h-full w-full bg-transparent backdrop:bg-black backdrop:bg-opacity-50"
    >
      <ColumnWrapper className="bg-color-dark text-color-default mx-auto w-[90%] gap-2 rounded-lg border-[1px] border-black50 px-8 py-4 lg:w-[60%]">
        <MaterialSymbolsLightCloseRounded
          className="flex-shrink-0 cursor-pointer self-end text-xl"
          onClick={() => refObject.current?.close()}
        />
        <RowWrapper
          align="content-start items-start"
          className="w-full border-b-[1px] border-black50 pb-2"
        >
          <RowWrapper className="flex-grow">
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
            <RowWrapper>
              {optionsElement}{" "}
              {user.dm_permission === "anyone" && (
                <Link href={`/message/${user_id}`}>
                  <MaterialSymbolsAndroidMessagesOutline className="flex-shrink-0 text-2xl" />
                </Link>
              )}
              {user.dm_permission === "servers" && mutualServers.length > 0 && (
                <Link href={`/message/${user_id}`}>
                  <MaterialSymbolsAndroidMessagesOutline className="flex-shrink-0 text-2xl" />
                </Link>
              )}
            </RowWrapper>
          )}
        </RowWrapper>
        <RowWrapper breakPoint="md" className="w-full">
          <p className="my-4 flex-grow text-wrap pl-2 md:max-w-[60%]">
            {user.user.person_description}
          </p>
          {!user.isSelf && (
            <ColumnWrapper align="items-start">
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
      </ColumnWrapper>
    </dialog>
  );
}
