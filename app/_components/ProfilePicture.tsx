import MaterialSymbolsProfile from "../../icons/MaterialSymbolsProfile";

type ProfilePictureProps = {
  width: number;
  image?: string;
};

function ProfilePicture({ width, image }: ProfilePictureProps) {
  return (
    <div
      className={"flex-shrink-0 rounded-full bg-white bg-cover"}
      style={{ width: width, height: width, backgroundImage: `url(${image})` }}
    >
      {!image && <MaterialSymbolsProfile width={width} height={width} />}
    </div>
  );
}

export default ProfilePicture;
