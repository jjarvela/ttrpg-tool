"use client";

import logOut from "../../../actions/logout";
import MaterialSymbolsLightLoginOutlineRounded from "../../../public/icons/MaterialSymbolsLightLoginOutlineRounded";

export default function MenuButtonLogout() {
  const handleLogout = () => {
    logOut();
  };
  return (
    <button onClick={() => handleLogout()} className="group relative mt-auto">
      <MaterialSymbolsLightLoginOutlineRounded className="h-12 w-12 cursor-pointer rounded-full p-1 hover:scale-110" />
      <span className="absolute bottom-1 left-20 -translate-x-1/2 transform rounded-md bg-black px-2 py-1 text-center text-white opacity-0 transition-opacity group-hover:opacity-100">
        Logout
      </span>
    </button>
  );
}
