import Main from "../../_components/wrappers/PageMain";
import { auth } from "@/auth";
import { getUsersExcept } from "@/prisma/services/userService";
import errorHandler from "@/utils/errorHandler";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import UserThumb from "./_components/UserThumb";

export default async function Home() {
  const session = await auth();

  if (!session || !(session as ExtendedSession).userId)
    return redirect("/welcome");

  const element: JSX.Element = await errorHandler(
    async () => {
      const users = await getUsersExcept((session as ExtendedSession).userId, {
        screen_name: true,
        username: true,
        profile_image: true,
        person_status: true,
        socket_id: true,
      });

      if (users.length < 1) return <p>No users</p>;

      const online = users.filter((person) => person.socket_id !== null);

      const offline = users.filter((person) => person.socket_id === null);

      return (
        <Fragment>
          <h3>Online</h3>

          {online.length > 0 &&
            online.map((user) => <UserThumb key={user.id} user={user} />)}

          <h3>Offline</h3>

          {offline.length > 0 &&
            offline.map((user) => <UserThumb key={user.id} user={user} />)}
        </Fragment>
      );
    },
    () => <p className="text-warning">Something went wrong</p>,
  );

  return (
    <Main className="w-full items-center justify-between pb-10">{element}</Main>
  );
}
