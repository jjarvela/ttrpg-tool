import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import Main from "@/app/_components/wrappers/PageMain";
import { auth } from "@/auth";
import { getUserBlocklist } from "@/prisma/services/userService";
import errorHandler from "@/utils/errorHandler";
import { redirect } from "next/navigation";

export default async function BlocklistPage() {
  const session = await auth();

  if (!session || !(session as ExtendedSession).userId)
    return redirect("/welcome");

  const element: JSX.Element = await errorHandler(
    async () => {
      const blocklist = await getUserBlocklist(
        (session as ExtendedSession).userId,
      );

      if (blocklist.length < 1) {
        return <p>You have not blocked any users.</p>;
      }

      return (
        <ColumnWrapper>
          {blocklist.map((user) => (
            <p key={user.id}>{user.username}</p>
          ))}
        </ColumnWrapper>
      );
    },
    () => (
      <p className="text-warning">
        Something went wrong. Please refresh the page.
      </p>
    ),
  );

  return (
    <Main className="w-full items-center justify-between pb-10">{element}</Main>
  );
}
