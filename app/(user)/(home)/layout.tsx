import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import HomeClientWrapper from "./_components/HomeClientWrapper";
import ConversationsMenu from "./_components/ConversationsMenu";
import HomeTopMenu from "./_components/HomeTopMenu";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HomeClientWrapper conversationsMenu={<ConversationsMenu />}>
      <ColumnWrapper className="home-layout h-full flex-grow p-0">
        <HomeTopMenu friendRequests={[]} />
        {children}
      </ColumnWrapper>
    </HomeClientWrapper>
  );
}
