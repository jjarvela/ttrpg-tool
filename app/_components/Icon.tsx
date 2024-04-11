import getBlobSASUrl from "@/actions/getBlobSASUrl";
import { twMerge } from "tailwind-merge";

export default async function Icon({
  filename,
  alt,
  className,
}: {
  filename: string;
  alt: string;
  className?: string;
}) {
  const icon = await getBlobSASUrl(filename);
  return (
    <img
      src={icon}
      alt={alt}
      className={twMerge(
        "min-h-[100%] min-w-[100%] rounded-full object-cover transition-all group-hover:rounded-md",
        className,
      )}
    />
  );
}
