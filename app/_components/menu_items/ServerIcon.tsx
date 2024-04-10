import getBlobSASUrl from "@/actions/getBlobSASUrl";

export default async function ServerIcon({
  filename,
  serverName,
}: {
  filename: string;
  serverName: string;
}) {
  const icon = await getBlobSASUrl(filename);
  return (
    <img
      src={icon}
      alt={serverName}
      className="min-h-[100%] min-w-[100%] rounded-full object-cover transition-all group-hover:rounded-md"
    />
  );
}
