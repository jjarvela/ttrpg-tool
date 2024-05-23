import Main from "@/app/_components/wrappers/PageMain";
import SearchBar from "./_components/SearchBar";
import { getAllBySearchTerm } from "@/prisma/services/searchServers";
import ServerThumb from "../_components/ServerThumb";
import ExploreSearchNav from "../_components/ExploreSearchNav";
import errorHandler from "@/utils/errorHandler";

export default async function ServerSearch({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchTerm = searchParams?.q || "";

  const element: JSX.Element = await errorHandler(
    async () => {
      const servers = await getAllBySearchTerm(searchTerm.toString());
      return (
        <div className="grid grid-cols-1 justify-items-center px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
          {servers.length > 0 &&
            servers.map((server) => (
              <div key={server.id} className="py-2">
                <ServerThumb server={server} />
              </div>
            ))}
        </div>
      );
    },
    () => {
      return <h5>Something went wrong during the search. Please try again.</h5>;
    },
  );

  return (
    <Main>
      <ExploreSearchNav />
      <SearchBar />
      {element}
    </Main>
  );
}
