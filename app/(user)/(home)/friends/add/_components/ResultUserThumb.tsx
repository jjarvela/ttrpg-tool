import getBlobSASUrl from "@/actions/getBlobSASUrl";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsProfile from "@/public/icons/MaterialSymbolsProfile";
import { useEffect, useState } from "react";

export default function ResultUserThumb({
  user,
  optionsElement,
}: {
  user: Omit<UserBasic, "person_status" | "socket_id">;
  optionsElement: React.ReactNode;
}) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (user.profile_image) {
      getBlobSASUrl(user.profile_image).then((result) => setImageUrl(result));
    }
  });
  return (
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
      {optionsElement}
    </RowWrapper>
  );
}
