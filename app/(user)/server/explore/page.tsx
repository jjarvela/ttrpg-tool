import Main from "@/app/_components/wrappers/PageMain";
import { getNewlyCreated } from "@/prisma/services/exploreServers";
import ExploreCarousel from "../_components/ExploreCarousel";
import ExploreSearchNav from "../_components/ExploreSearchNav";
import errorHandler from "@/utils/errorHandler";

export default async function ServerHub() {
  const element: JSX.Element = await errorHandler(
    async () => {
      const newlyCreated = await getNewlyCreated();
      return <ExploreCarousel title="New servers" servers={newlyCreated} />;
    },
    () => {
      <h5>Something went wrong. Please try refreshing the page.</h5>;
    },
  );
  return (
    <Main className="content-start items-start">
      <ExploreSearchNav />
      {element}
    </Main>
  );
}
