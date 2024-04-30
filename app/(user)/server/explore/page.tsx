import Main from "@/app/_components/wrappers/PageMain";
import { getNewlyCreated } from "@/prisma/services/exploreServers";
import ExploreCarousel from "../_components/ExploreCarousel";
import ExploreSearchNav from "../_components/ExploreSearchNav";

export default async function ServerHub() {
  const newlyCreated = await getNewlyCreated();
  return (
    <Main className="content-start items-start">
      <ExploreSearchNav />
      <ExploreCarousel title="New servers" servers={newlyCreated} />
    </Main>
  );
}
