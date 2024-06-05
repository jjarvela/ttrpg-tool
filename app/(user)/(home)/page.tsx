import Main from "../../_components/wrappers/PageMain";
import { auth } from "@/auth";
import errorHandler from "@/utils/errorHandler";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import UserThumb from "./_components/UserThumb";
import { getUserFriends } from "@/prisma/services/friendService";
import FriendOptionsElement from "./_components/FriendOptionsElement";

export default async function Home() {
  const session = await auth();

  if (!session || !(session as ExtendedSession).userId)
    return redirect("/welcome");

  const element: JSX.Element = await errorHandler(
    async () => {
      const friendList = await getUserFriends(
        (session as ExtendedSession).userId,
      );

      if (friendList.length < 1)
        return <p>{"You haven't added any friends yet."}</p>;

      const online = friendList.filter((person) => person.socket_id !== null);

      const offline = friendList.filter((person) => person.socket_id === null);

      return (
        <Fragment>
          <h3>Online</h3>

          {online.length > 0 &&
            online.map((user) => (
              <UserThumb
                key={user.id}
                user={user}
                optionsElement={
                  <FriendOptionsElement
                    name={user.screen_name || user.username}
                    user_id={user.id}
                  />
                }
              />
            ))}

          <h3>Offline</h3>

          {offline.length > 0 &&
            offline.map((user) => (
              <UserThumb
                key={user.id}
                user={user}
                optionsElement={
                  <FriendOptionsElement
                    name={user.screen_name || user.username}
                    user_id={user.id}
                  />
                }
              />
            ))}
        </Fragment>
      );
    },
    (e) => {
      console.log(e);
      return <p className="text-warning">Something went wrong</p>;
    },
  );

  return (
    <Main className="w-full items-center justify-between pb-10">{element}</Main>
  );
}
