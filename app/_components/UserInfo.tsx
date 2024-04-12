import { twMerge } from "tailwind-merge";
import ProfilePicture from "./ProfilePicture";
import RowWrapper from "./wrappers/RowWrapper";

type UserInfoProps = {
  username: string;
  width: number;
  isActive: boolean;
  screen_name?: string;
  image?: string;
  className?: string;
};

function UserInfo({
  username,
  width,
  isActive,
  screen_name,
  image,
  className,
}: UserInfoProps) {
  return (
    <RowWrapper breakPoint="xs" className={twMerge("w-full", className)}>
      <ProfilePicture width={width} isActive={isActive} image={image} />
      <div className="overflow-hidden overflow-ellipsis">
        {screen_name ? screen_name : username}{" "}
      </div>
    </RowWrapper>
  );
}

export default UserInfo;
