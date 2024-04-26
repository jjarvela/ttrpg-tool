import Link from "next/link";

type Server = {
  id: string;
  server_name: string;
  image: string | null;
};

/**
 * CLIENT component for server icon in side menu
 * @param server - server information (id, server_name, image)
 * @param icon - ReactNode, Icon component. Passed as prop to retain its server-side functionality
 * @returns JSX element with hover functionality
 */
export default function ServerIcon({
  server,
  icon,
}: {
  server: Server;
  icon: React.ReactNode;
}) {
  return (
    <Link href={`/server/${server.id}`}>
      <span className="relative my-2 inline-block h-12 w-12 cursor-pointer overflow-hidden rounded-full bg-black50 shadow-md transition-all group-hover:rounded-md">
        {server.image && icon}
      </span>
    </Link>
  );
}
