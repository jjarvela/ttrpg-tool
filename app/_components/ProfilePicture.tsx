import MaterialSymbolsProfile from "../../public/icons/MaterialSymbolsProfile";

type ProfilePictureProps = {
  width: number;
  image?: string;
};

function ProfilePicture({ width, image }: ProfilePictureProps) {
  return (
    <div
      className={"flex-shrink-0 overflow-hidden rounded-full bg-black50"}
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
