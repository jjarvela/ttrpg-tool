import ProfilePicture from "@/app/_components/ProfilePicture";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import UserThumbProfileWrapper from "./UserThumbProfileWrapper";
import StrangerOptionsElement from "./StrangerOptionsElement";
import FriendOptionsElement from "./FriendOptionsElement";
import SelfOptionsElement from "./SelfOptionsElement";

export default function UserThumb({
  user,
  options,
}: {
  user: UserBasic;
  options: "stranger" | "friend" | "self";
}) {
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
    <RowWrapper className="card-back w-[90%] flex-wrap rounded-lg border-[1px] border-black50 px-4 py-2 lg:w-[55%]">
      <UserThumbProfileWrapper
        user_id={user.id}
        optionsElement={setOptionsElement("row")}
      >
        <ColumnWrapper className="flex-grow">
          <RowWrapper className="w-full justify-start">
            <ProfilePicture
              width={40}
              isActive={false}
              image={user.profile_image || undefined}
            />
            <h4>{user.screen_name || user.username}</h4>
            <p className="text-black50">
              {"@"}
              {user.username}
            </p>
          </RowWrapper>
          <RowWrapper>{user.person_status}</RowWrapper>
        </ColumnWrapper>
      </UserThumbProfileWrapper>
      {setOptionsElement()}
    </RowWrapper>
  );
}
