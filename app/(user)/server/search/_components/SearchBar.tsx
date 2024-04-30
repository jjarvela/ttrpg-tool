"use client";

import TextInput from "@/app/_components/inputs/TextInput";
import MaterialSymbolsLightSearchRounded from "@/public/icons/MaterialSymbolsLightSearchRounded";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  return (
    <TextInput
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/server/search?q=${searchTerm}`);
        }
      }}
      endElement={
        <button
          className="text-default text-xl"
          onClick={() => {
            router.push(`/server/search?q=${searchTerm}`);
          }}
        >
          <MaterialSymbolsLightSearchRounded />
        </button>
      }
    />
  );
}
