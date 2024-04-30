import SideMenu from "../_components/SideMenu";
import SocketWrapper from "../_components/wrappers/SocketWrapper";
import { auth } from "@/auth";

export default async function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  //if public route and no session return just the page without the side bar
  if (!session) return children;

  return (
    <SocketWrapper userId={(session as ExtendedSession).userId}>
      <SideMenu />
      {children}
    </SocketWrapper>
  );
}
