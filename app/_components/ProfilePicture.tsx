import MaterialSymbolsProfile from "../../public/icons/MaterialSymbolsProfile";
import Icon from "./Icon";

type ProfilePictureProps = {
  width: number;
  isActive: boolean;
  image?: string;
};

async function ProfilePicture({ width, isActive, image }: ProfilePictureProps) {
  return (
    <div
      className={
        isActive
          ? "flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-black50 outline outline-2 outline-accent"
          : "flex-shrink-0 overflow-hidden rounded-full bg-black50"
      }
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
