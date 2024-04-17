"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function SocketWrapper({
  userId,
  children,
}: {
  userId: string;
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    //if no socket, form new connection
    if (!socket) {
      const connection = io();
      setSocket(connection);
      connection.emit("add-user", userId);

      //disconnect from socket when SocketWrapper dismounts
      return () => {
        connection.disconnect();
      };
    }
    //if socket exists but isn't connected, connect
    if (socket && !socket.connected) {
      socket.connect();
      socket.emit("add-user", userId);
    }
  });

  return <div className="fixed flex h-screen w-screen">{children}</div>;
}
