import Main from "@/app/_components/wrappers/PageMain";
import LatestNotes from "./_components/LatestNotes";
import LatestMessages from "./_components/LatestMessages";

export default function ServerHome() {
  return (
    <Main className="grid grid-cols-1 gap-4 p-6 lg:grid-cols-2">
      <LatestMessages />
      <LatestNotes />
    </Main>
  );
}
