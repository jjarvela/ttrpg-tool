import { twMerge } from "tailwind-merge";
import ProfilePicture from "./ProfilePicture";
import RowWrapper from "./wrappers/RowWrapper";
import { isFriend } from "@/prisma/services/friendService";
import UserThumbProfileWrapper from "../(user)/(home)/_components/UserThumbProfileWrapper";
import FriendOptionsElement from "../(user)/(home)/_components/FriendOptionsElement";
import SelfOptionsElement from "../(user)/(home)/_components/SelfOptionsElement";
import StrangerOptionsElement from "../(user)/(home)/_components/StrangerOptionsElement";

type UserInfoProps = {
  user: UserBasic;
  width: number;
  self_id: string;
  className?: string;
};

async function UserInfo({ user, self_id, width, className }: UserInfoProps) {
  const friends = await isFriend(user.id, self_id);

  function setOptionsElement(mode?: "row" | "column") {
    if (user.id === self_id) {
      return <SelfOptionsElement user_id={user.id} mode={mode} />;
    }

    if (friends) {
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
    <UserThumbProfileWrapper
      user_id={user.id}
      optionsElement={setOptionsElement("row")}
    >
      <RowWrapper breakPoint="xs" className={twMerge("w-full", className)}>
        <ProfilePicture
          width={width}
          isActive={user.socket_id ? true : false}
          image={user.profile_image || undefined}
        />
        <div className="overflow-hidden overflow-ellipsis">
          {user.screen_name || user.username}{" "}
        </div>
      </RowWrapper>
    </UserThumbProfileWrapper>
  );
}

export default UserInfo;
