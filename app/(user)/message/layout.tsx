import UserList from "./_components/UserList";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) return redirect("/welcome");

  return (
    <div className="flex w-full">
      <ColumnWrapper>
        <p>Private messages</p>
        <UserList user={(session as ExtendedSession).userId} />
      </ColumnWrapper>
      {children}
    </div>
  );
}
