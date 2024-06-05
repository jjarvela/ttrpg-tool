import ProfilePicture from "@/app/_components/ProfilePicture";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";

export default function UserThumb({
  user,
  optionsElement,
}: {
  user: UserBasic;
  optionsElement: React.ReactNode;
}) {
  return (
    <RowWrapper>
      <ColumnWrapper className="card-back w-[90%] rounded-lg border-[1px] border-black50 lg:w-[55%]">
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
      {optionsElement}
    </RowWrapper>
  );
}
