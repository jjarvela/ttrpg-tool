import getBlobSASUrl from "@/actions/getBlobSASUrl";
import UserProfileModal from "@/app/_components/UserProfileModal";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsProfile from "@/public/icons/MaterialSymbolsProfile";
import { useEffect, useRef, useState } from "react";
import FriendOptionsElement from "../../../_components/FriendOptionsElement";
import SelfOptionsElement from "../../../_components/SelfOptionsElement";
import StrangerOptionsElement from "../../../_components/StrangerOptionsElement";

export default function ResultUserThumb({
  user,
  options,
}: {
  user: Omit<UserBasic, "person_status" | "socket_id">;
  options: "stranger" | "friend" | "self";
}) {
  const [imageUrl, setImageUrl] = useState("");
  const userDetailRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (user.profile_image && imageUrl === "") {
      getBlobSASUrl(user.profile_image).then((result) => setImageUrl(result));
    }
  });

  function setOptionsElement(mode?: "row" | "column") {
    if (options === "self") {
      return <SelfOptionsElement user_id={user.id} mode={mode} />;
    }

    if (options === "friend") {
      return (
        <FriendOptionsElement
          name={user.screen_name || user.username}
          user_id={user.id}
          mode={mode}
        />
      );
    }
    return (
      <StrangerOptionsElement
        name={user.screen_name || user.username}
        user_id={user.id}
        mode={mode}
      />
    );
  }

  return (
    <RowWrapper
      justify="justify-start"
      className="card-back w-[90%] flex-wrap rounded-lg border-[1px] border-black50 px-4 py-2 lg:w-[55%]"
    >
      <RowWrapper
        className="flex-grow cursor-pointer"
        onClick={() => userDetailRef.current?.showModal()}
      >
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-black50"
          style={{ width: 40, height: 40 }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={user.username}
              className="min-h-[100%] min-w-[100%] rounded-full object-cover transition-all group-hover:rounded-md"
            />
          ) : (
            <MaterialSymbolsProfile width={40} height={40} />
          )}
        </div>
        <h4>{user.screen_name || user.username}</h4>
        <p className="text-black50">
          {"@"}
          {user.username}
        </p>
      </RowWrapper>
      {setOptionsElement()}
      <UserProfileModal
        refObject={userDetailRef}
        user_id={user.id}
        optionsElement={setOptionsElement("row")}
      />
    </RowWrapper>
  );
}
