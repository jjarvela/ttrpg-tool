import React from "react";
import ColumnWrapper from "./wrappers/ColumnWrapper";
import Link from "next/link";
import Image from "next/image";
import diamond from "../../public/icons/diamond.svg";
import pipeTop from "../../public/icons/pipe-top.svg";
import pizzaSlice from "../../public/icons/pizza-slice.svg";
import MaterialSymbolsLight3p from "../../public/icons/MaterialSymbolsLight3p";
import MaterialSymbolsLightAdd from "../../public/icons/MaterialSymbolsLightAdd";
import Button from "./Button";
import logOut from "../../actions/logout";
interface Server {
  id: number;
  name: string;
  icon: string;
}

const SideMenu = () => {
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
        className="bg-color-dark fixed bottom-0 left-0 top-0 mb-2 border-r-2 border-gray-600"
      >
        <MaterialSymbolsLight3p width={40} height={40} />
        <ul>
          {servers.map((server) => (
            <li key={server.id}>
              <Link href={`/server/${server.id}`}>
                <div className="group relative">
                  <span className="relative my-2 inline-block overflow-hidden rounded-full bg-gray-500 shadow-md transition-all group-hover:rounded-md">
                    <Image
                      src={server.icon}
                      alt={server.name}
                      className="h-12 w-12 cursor-pointer rounded-full transition-all group-hover:rounded-md"
                    />
                  </span>
                  <span className="absolute bottom-0 left-20 -translate-x-1/2 transform rounded-md bg-black px-2 py-1 text-center text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {server.name}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="">
          <Link href="/create">
            <MaterialSymbolsLightAdd
              width={40}
              height={40}
              className="h-12 w-12 cursor-pointer rounded-full transition-transform hover:rotate-180"
            />
          </Link>
        </div>
        <Button className="btn-secondary mt-auto p-1" handleClick={logOut}>
          <small>Log out</small>
        </Button>
      </ColumnWrapper>
    </nav>
  );
};

export default SideMenu;
