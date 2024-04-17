import SideMenu from "../_components/SideMenu";
import SocketWrapper from "../_components/wrappers/SocketWrapper";
import FeedbackCard from "../_components/FeedbackCard";
import { auth } from "@/auth";

export default async function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || !(session as ExtendedSession).userId)
    return <FeedbackCard type="error" message="Something went wrong" />;
  return (
    <SocketWrapper userId={(session as ExtendedSession).userId}>
      <SideMenu />
      {children}
    </SocketWrapper>
  );
}
