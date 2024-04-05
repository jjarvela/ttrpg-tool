import UserList from "./_components/UserList";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "../../../prisma/services/userService";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user || !session.user.email)
    return redirect("/welcome");

  const user = await getUserByEmail(session.user.email);

  if (typeof user !== "string") {
    return (
      <div className="flex flex-col">
        <p>Private messages</p>
        <div className="flex">
          <UserList user={user || undefined} />
          {children}
        </div>
      </div>
    );
  }
}
