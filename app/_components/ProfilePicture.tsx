import MaterialSymbolsProfile from "../../public/icons/MaterialSymbolsProfile";

type ProfilePictureProps = {
  width: number;
  isActive: boolean;
  image?: string;
};

function ProfilePicture({ width, isActive, image }: ProfilePictureProps) {
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
        <Image
          src={`${image}`}
          alt="User profile image"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <MaterialSymbolsProfile width={width} height={width} />
      )}
    </div>
  );
}

export default ProfilePicture;
