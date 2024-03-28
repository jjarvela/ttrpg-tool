import ColumnWrapper from "../../_components/wrappers/ColumnWrapper";
import Main from "../../_components/wrappers/PageMain";

export default function ServerHomeSuspense() {
  return (
    <div className="flex flex-grow">
      <ColumnWrapper className="sticky mr-2 h-full w-[15%] border-r border-r-black50 p-0"></ColumnWrapper>
      <Main></Main>
      <ColumnWrapper
        mode="section"
        id="server-members-nav"
        className="bg-black"
      >
        <ColumnWrapper className="sticky h-full w-[10%]"></ColumnWrapper>
      </ColumnWrapper>
    </div>
  );
}
