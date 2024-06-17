"use client";

import { Channel, Message } from "@prisma/client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import handleGetNewMessages from "./GetNewMessagesHandler";

export default function ChannelThumb({ channel }: { channel: Channel }) {
  const [isHovering, setIsHovering] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const getChatMessages = async () => {
      try {
        const messages = await handleGetNewMessages(channel.uid);

        setChatMessages(messages as Message[]);
      } catch (error) {
        console.error("Failed to fetch chat messages:", error);
      }
    };

    getChatMessages();
  }, [channel.uid]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <Link
      href={`/server/${channel.server_id}/chat/${channel.uid}`}
      className={twMerge(
        "card-back relative h-[10rem] w-[14.5rem] overflow-hidden rounded-lg border-[1px] border-black50 duration-200 ease-linear",
        isHovering && "-translate-y-2",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {channel && (
        <div
          className={twMerge(
            "flex flex-col justify-end opacity-45 duration-200 ease-linear",
            isHovering && "opacity-75",
          )}
          style={{
            position: "absolute",
            top: 0,
            bottom: 10,
            left: 0,
            right: 0,
            overflowY: "auto",
            padding: "10px",
          }}
        >
          <div className="m-2">
            {chatMessages.map((message) => (
              <div className="" key={message.uid}>
                <p>
                  {message.created_at.toLocaleTimeString()} {message.message}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
      <div>
        <h4 className="absolute bottom-0 right-2">{channel.channel_name}</h4>
      </div>
    </Link>
  );
}
