import getBlobSASUrl from "@/actions/getBlobSASUrl";

export default async function Icon({
  filename,
  alt,
}: {
  filename: string;
  alt: string;
}) {
  const icon = await getBlobSASUrl(filename);
  return (
    <img
      src={icon}
      alt={alt}
      className="min-h-[100%] min-w-[100%] rounded-full object-cover transition-all group-hover:rounded-md"
    />
  );
}
