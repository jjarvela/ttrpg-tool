import ProfilePicture from "./ProfilePicture";
import RowWrapper from "./wrappers/RowWrapper";

type UserInfoProps = {
  username: string;
  width: number;
  isActive: boolean;
  screen_name?: string;
  image?: string;
};

function UserInfo({
  username,
  width,
  isActive,
  screen_name,
  image,
}: UserInfoProps) {
  return (
    <RowWrapper className="m-2" breakPoint="xs">
      <ProfilePicture width={width} isActive={isActive} image={image} />
      <div>{screen_name ? <p>{screen_name}</p> : <p>{username}</p>}</div>
    </RowWrapper>
  );
}

export default UserInfo;
