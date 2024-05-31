"use client";
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
    channel_name: string;
  };
}

interface LatestMessagesProps {
  newMessages: NewMessage[];
}

const LatestMessages = ({ newMessages }: LatestMessagesProps) => {
  const [latestMessages, setLatestMessages] = useState<NewMessage[]>([]);

  useEffect(() => {
    setLatestMessages(newMessages);
  }, [newMessages]);

  return (
    <div className="scrollbar-thin relative flex max-h-64 flex-col overflow-auto bg-black75 px-5 lg:max-h-96">
      <div className="sticky top-0 flex h-32 w-full bg-black75">
        <h2 className="mx-auto text-lg font-semibold text-gray-800 dark:text-gray-200">
          New Messages
        </h2>
      </div>
      <div className="m-4 grid grid-cols-1 gap-4 ">
        {latestMessages.map((message) => (
          <div
            key={message.message.uid}
            className="rounded-lg bg-black85 p-4 shadow"
          >
            <h5 className="text-sm font-bold text-white">
              {message.message.sender.username}
            </h5>
            <p className="text-xs text-gray-300">
              {message.channel.channel_name}
            </p>
            <p className="text-xs text-gray-300">{message.message.message}</p>
            <p className="text-xs text-gray-500">
              {message.message.created_at.toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestMessages;
