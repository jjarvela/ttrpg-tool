import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import HomeClientWrapper from "./_components/homeNavElements/HomeClientWrapper";
import ConversationsMenu from "./_components/homeNavElements/ConversationsMenu";
import HomeTopMenu from "./_components/homeNavElements/HomeTopMenu";
import { auth } from "@/auth";
import errorHandler from "@/utils/errorHandler";
import { getUserReceivedRequests } from "@/prisma/services/friendService";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const topMenu = await errorHandler(
    async () => {
      const friendRequests = await getUserReceivedRequests(
        (session as ExtendedSession).userId,
      );

      return <HomeTopMenu friendRequests={friendRequests} />;
    },
    () => <HomeTopMenu friendRequests={[]} />,
  );
  return (
    <HomeClientWrapper conversationsMenu={<ConversationsMenu />}>
      <ColumnWrapper className="home-layout h-full flex-grow p-0">
        {topMenu}
        {children}
      </ColumnWrapper>
    </HomeClientWrapper>
  );
}
