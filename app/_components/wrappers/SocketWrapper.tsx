"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { useRouter } from "next/navigation";

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
    if (socket.connected) {
      onConnect();
    }

    socket.on("connect", onConnect);

    socket.on("add-user", () => {
      socket.emit("send-user", userId);
      setLatestEvent("sent user");
    });

    socket.on("received-user", () => {
      setLatestEvent("Received user");
    });

    socket.on("received-message", () => {
      console.log("received message");
      setLatestEvent("received message");
      router.refresh();
    });

    socket.on("disconnect", onDisconnect);

    return () => {
      //clear event listeners when component dismounts
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };

    function onConnect() {
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
