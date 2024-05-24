import getBlobSASUrl from "@/actions/getBlobSASUrl";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function CharacterThumb({
  character,
  size,
  onClick,
}: {
  character: Omit<CharacterBase, "owner_id" | "notes">;
  size: "sm" | "lg";
  onClick?: () => void;
}) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (character.image) {
      try {
        getBlobSASUrl(character.image).then((url) => setImageUrl(url));
      } catch (e) {
        return;
      }
    }
  });

  function classes() {
    if (size === "sm") {
      return "w-[18rem] h-[10rem]";
    }

    return "w-[20rem] h-[10rem] lg:w-[30rem] lg:h-[15.5rem]";
  }

  return (
    <RowWrapper
      className={twMerge(classes(), onClick && "cursor-pointer")}
      onClick={() => onClick && onClick()}
    >
      <div className="h-full w-[40%] flex-shrink-0">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={character.name}
            className="min-h-[100%] min-w-[100%] object-cover"
          />
        )}
      </div>
      <ColumnWrapper>
        <h5 className="w-full overflow-hidden text-ellipsis">
          {character.name}
        </h5>
        <small className="line-clamp-2 w-full text-ellipsis">
          {character.description}
        </small>
      </ColumnWrapper>
    </RowWrapper>
  );
}
