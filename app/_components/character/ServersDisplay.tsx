"use client";

import { useState } from "react";
import Icon from "../Icon";
import ColumnWrapper from "../wrappers/ColumnWrapper";

export default function ServersDisplay({
  servers,
}: {
  servers: { id: string; server_name: string; image: string | null }[];
}) {
  const [showElement, setShowElement] = useState(false);
  return (
    <ColumnWrapper
      justify="justify-center justify-items-center relative"
      className="m-0 p-0"
      onMouseEnter={() => setShowElement(true)}
      onMouseLeave={() => setShowElement(false)}
    >
      <div className="flex items-center">
        {servers.map((server, index) => {
          if (index < 3) {
            return (
              <div
                className={
                  "outline-6 mx-[-0.2rem] flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-black50 outline outline-white dark:outline-black85"
                }
                key={server.id}
              >
                {server.image && (
                  <Icon filename={server.image} alt={server.server_name} />
                )}
              </div>
            );
          }
        })}
      </div>
      {showElement && (
        <ColumnWrapper className="absolute top-8 min-w-max rounded-lg bg-black25 p-2 dark:bg-black">
          {servers.map((server, index) => {
            if (index < 3) {
              return <small key={server.id}>{server.server_name}</small>;
            }
            if (index === 3) {
              return (
                <small key={server.id}>and {servers.length - 3} more</small>
              );
            }
          })}
        </ColumnWrapper>
      )}
    </ColumnWrapper>
  );
}
