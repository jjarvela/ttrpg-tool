import React from "react";
import ColumnWrapper from "./wrappers/ColumnWrapper";
import Link from "next/link";

interface Server {
  id: number;
  name: string;
  icon: string;
}

interface Props {
  servers: Server[];
}

const Image = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
);
const SideMenu: React.FC<Props> = ({ servers }) => {
  return (
    <nav>
      <ColumnWrapper
        align="items-center"
        className="absolute left-0 top-0 mb-2"
      >
        <ul>
          {servers.map((server) => (
            <li key={server.id}>
              <Link href={`/server/${server.id}`}>
                <Image src={server.icon} alt={server.name} />
                {server.name}
              </Link>
            </li>
          ))}
        </ul>
      </ColumnWrapper>
    </nav>
  );
};

export default SideMenu;
