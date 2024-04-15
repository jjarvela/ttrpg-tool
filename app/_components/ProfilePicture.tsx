import { twMerge } from "tailwind-merge";
import MaterialSymbolsProfile from "../../public/icons/MaterialSymbolsProfile";
import Icon from "./Icon";

type ProfilePictureProps = {
  width: number;
  isActive: boolean;
  image?: string;
  className?: string;
};

async function ProfilePicture({
  width,
  isActive,
  image,
  className,
}: ProfilePictureProps) {
  return (
    <div
      className={twMerge(
        "flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-black50",
        isActive ? "outline outline-2 outline-accent" : "",
        className,
      )}
      style={{ width: width, height: width }}
    >
      {image ? (
        <Icon filename={image} alt="profile image" />
      ) : (
        <MaterialSymbolsProfile width={width} height={width} />
      )}
    </div>
  );
}

export default ProfilePicture;
