import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import ColumnWrapper from "../../../_components/wrappers/ColumnWrapper";
import getBlobSASUrl from "@/actions/getBlobSASUrl";

export default async function Introduction() {
  return (
    <section id="introduction-container" className="w-full">
      <ColumnWrapper className="w-full">
        <h2 className="text-center">
          Welcome to TTRPG-tool, the go-to tool for bringing the tabletop online
        </h2>
        <RowWrapper
          justify="md:justify-center"
          breakPoint="md"
          className="gap-8"
        >
          <img width={500} src={"/characters.png"} alt="Create characters" />
          <ColumnWrapper className="items-start md:w-[50%]">
            <h3>Create and share your characters</h3>
            <p>
              With the server-based system, your character can live multiple
              different lives simultaneously!
            </p>
          </ColumnWrapper>
        </RowWrapper>

        <RowWrapper
          justify="md:justify-center"
          breakPoint="md"
          className="flex-col-reverse gap-8"
        >
          <ColumnWrapper className="items-start md:w-[50%]">
            <h3>Explore your worlds</h3>
            <p>
              You can upload your own game boards to customise your story. Enjoy
              real-time updates from all your party members!
            </p>
          </ColumnWrapper>
          <img width={500} src={"/board.png"} alt="Explore" />
        </RowWrapper>
      </ColumnWrapper>
    </section>
  );
}
