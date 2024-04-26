import Main from "@/app/_components/wrappers/PageMain";
import SearchBar from "./_components/SearchBar";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getAllBySearchTerm } from "@/prisma/services/searchServers";
import ServerThumb from "../_components/ServerThumb";
import ExploreSearchNav from "../_components/ExploreSearchNav";

export default async function ServerSearch({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchTerm = searchParams?.q || "";

  const servers = await getAllBySearchTerm(searchTerm.toString());
  return (
    <Main>
      <ExploreSearchNav />
      <SearchBar />
      <div className="grid grid-cols-1 justify-items-center px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
        {servers.length > 0 &&
          servers.map((server) => (
            <div key={server.id} className="py-2">
              <ServerThumb server={server} />
            </div>
          ))}
      </div>
    </Main>
  );
}
