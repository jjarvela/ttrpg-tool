import getBlobSASUrl from "@/actions/getBlobSASUrl";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

/**
 * Icon component that generates Azure Blob SAS URL for the image src based on given filename
 * @param filename name of the file in azure storage
 * @param alt alt text
 * @param className additional or overriding classes
 * @returns JSX img element with default classes
 */
export default function Icon({
  filename,
  alt,
  className,
}: {
  filename: string;
  alt: string;
  className?: string;
}) {
  const [iconUrl, setIconUrl] = useState<string>("");

  useEffect(() => {
    async function fetchIconUrl() {
      const url = await getBlobSASUrl(filename);
      setIconUrl(url);
    }

    fetchIconUrl();
  }, [filename]);

  return (
    <img
      src={iconUrl}
      alt={alt}
      className={twMerge(
        "min-h-[100%] min-w-[100%] rounded-full object-cover transition-all group-hover:rounded-md",
        className,
      )}
    />
  );
}
