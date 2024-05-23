"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { useRouter } from "next/navigation";
import logOut from "@/actions/logout";
import { fetchUser } from "@/actions/userManagement/fetchUser";

export default function SocketWrapper({
  userId,
  children,
}: {
  userId: string;
  children: React.ReactNode;
}) {
  //debug purposes
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [latestEvent, setLatestEvent] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchUser(userId)
      .then(() => {
        if (socket.connected) {
          onConnect();
        } else {
          console.log("socket not connected, connecting");
          socket.connect();
        }
      })
      .catch(() => logOut());

    socket.on("connect", onConnect);

    socket.on("client-refresh", () => {
      router.refresh();
    });

    socket.on("disconnect", onDisconnect);

    return () => {
      //clear event listeners when component dismounts
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };

    function onConnect() {
      socket.emit("send-user", userId);
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
      setLatestEvent("connected");
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }
  }, []);

  return <div className="fixed flex h-screen w-screen">{children}</div>;
}
