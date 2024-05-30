"use client";
import { useEffect, useState } from "react";

export interface NewMessage {
  id: string;
  message: {
    conversation_uid: string;
    created_at: Date;
    message: string;
    sender_id: string;
    uid: string;
  };
  created_at: Date;
}

interface LatestMessagesProps {
  newMessages: NewMessage[];
}

const LatestMessages = ({ newMessages }: LatestMessagesProps) => {
  const [latestMessages, setLatestMessages] = useState<NewMessage[]>([]);

  useEffect(() => {
    setLatestMessages(newMessages);
  }, [newMessages]);

  useEffect(() => {
    console.log("New Messages:", newMessages);
    setLatestMessages(newMessages);
  }, [newMessages]);

  return (
    <div className="scrollbar-thin flex h-5/6 flex-col overflow-auto bg-black75 p-5">
      <div className="flex">
        <h2 className="mx-auto text-lg font-semibold text-gray-800 dark:text-gray-200">
          Latest Messages
        </h2>
      </div>
      <div className="m-4 grid grid-cols-1 gap-4 ">
        {latestMessages.map((message) => (
          <div key={message.id} className="rounded-lg bg-black85 p-4 shadow">
            <h5 className="text-sm font-bold text-white">
              {message.message.sender_id}
            </h5>
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
