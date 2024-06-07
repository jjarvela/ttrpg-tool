"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface NewMessage {
  id: string;
  message: {
    uid: string;
    message: string;
    sender: {
      username: string;
    };
    created_at: Date;
  };
  channel: {
    uid: string;
    channel_name: string;
  };
}

interface LatestMessagesProps {
  newMessages: NewMessage[];
  serverId: string;
}

const LatestMessages = ({ newMessages, serverId }: LatestMessagesProps) => {
  const [latestMessages, setLatestMessages] = useState<NewMessage[]>([]);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (newMessages.length !== latestMessages.length) {
      setFadeIn(true);

      setTimeout(() => {
        setFadeIn(false);
      }, 300);
    }
    const sortedMessages = [...newMessages].sort(
      (a, b) => b.message.created_at.getTime() - a.message.created_at.getTime(),
    );
    setLatestMessages(sortedMessages);
  }, [newMessages]);

  const messageStyle: React.CSSProperties = {
    opacity: fadeIn ? 0 : 1,
    transition: "opacity 0.3s ease-in-out",
  };

  return (
    <div className="relative flex flex-col bg-black25 px-1 dark:bg-black75">
      <div className="sticky top-0 flex bg-black25 dark:bg-black75">
        <h2 className="mx-auto text-lg font-semibold text-gray-800 dark:text-white">
          New Messages
        </h2>
      </div>
      <div className="m-4 grid grid-cols-1 gap-4 ">
        {latestMessages.map((message, index) => (
          <div
            key={message.message.uid}
            className="rounded-lg bg-black50 p-4 shadow dark:bg-black85"
            style={index === 0 ? messageStyle : undefined}
          >
            <h5 className="mb-1 text-sm font-bold text-white">
              {message.message.sender.username}{" "}
              <Link
                href={`/server/${serverId}/chat/${message.channel.uid}`}
                className="text-blue-700 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-700"
              >
                @{message.channel.channel_name}
              </Link>
            </h5>
            <p className="mb-1 text-xs text-white">{message.message.message}</p>
            <p className="text-xs text-black25">
              {message.message.created_at.toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestMessages;
