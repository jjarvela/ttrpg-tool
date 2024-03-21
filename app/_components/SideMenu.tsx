import React from "react";
import ColumnWrapper from "./wrappers/ColumnWrapper";
import Link from "next/link";
import Image from "next/image";
import diamond from "../../public/icons/diamond.svg";
import pipeTop from "../../public/icons/pipe-top.svg";
import pizzaSlice from "../../public/icons/pizza-slice.svg";

interface Server {
  id: number;
  name: string;
  icon: string;
}

const SideMenu: React.FC = () => {
  const servers: Server[] = [
    { id: 1, name: "Mansen Maakarit", icon: diamond },
    { id: 2, name: "Don't Come Here", icon: pipeTop },
    { id: 3, name: "Pizza", icon: pizzaSlice },
    // Add more servers as needed
  ];
  return (
    <nav>
      <ColumnWrapper
        align="items-center"
        className="absolute left-0 top-5 mb-2"
      >
        <ul>
          {servers.map((server) => (
            <li key={server.id}>
              <Link href={`/server/${server.id}`}>
                <div className="group relative">
                  <Image
                    src={server.icon}
                    alt={server.name}
                    className="h-12 w-12 group-hover:opacity-80"
                  />
                  <span className="absolute bottom-2 left-20 -translate-x-1/2 transform rounded-md bg-black px-2 py-1 text-center text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {server.name}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </ColumnWrapper>
    </nav>
  );
};

export default SideMenu;
