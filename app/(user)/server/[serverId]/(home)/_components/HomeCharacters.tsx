"use client";
import MaterialSymbolsProfile from "@/public/icons/MaterialSymbolsProfile";
import ClientIcon from "./ClientIcon";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io();
export interface HomeCharactersProps {
  initialCharacters: {
    level: number;
    class: string;
    vitals: number[];
    vitals_max: number[];
    base: {
      id: string;
      name: string;
      image: string | null;
    };
  }[];
  serverId: string;
}

export default function HomeCharacters({
  initialCharacters,
  serverId,
}: HomeCharactersProps) {
  const [characters, setCharacters] = useState(initialCharacters);

  useEffect(() => {
    // Function to handle joining and leaving rooms
    const joinServerRoom = (newServerId: string) => {
      // Leave the old room if we were previously connected to a room
      if (socket.connected) {
        socket.emit("leave-character-server", serverId);
      }
      // Join the new server room
      socket.emit("join-character-server", newServerId);
    };

    // Join the initial server room
    joinServerRoom(serverId);

    socket.on("updateCharacters", (newCharacters) => {
      setCharacters((prevCharacters) => [newCharacters, ...prevCharacters]);
    });

    socket.on("delete-character", (deletedCharacter) => {
      setCharacters((prevCharacters) =>
        prevCharacters.filter(
          (character) => character.base.id !== deletedCharacter,
        ),
      );
    });

    socket.on("edit-character", (editedCharId, editedCharacter) => {
      setCharacters((prevCharacters) => {
        return prevCharacters.map((character) =>
          character.base.id === editedCharId
            ? {
                ...character,
                level: editedCharacter.level,
                class: editedCharacter.class,
                vitals: editedCharacter.vitals,
                vitals_max: editedCharacter.vitals_max,
                base: editedCharacter.base,
              }
            : character,
        );
      });
    });

    return () => {
      socket.off("updateCharacters");
      socket.off("delete-character");
      socket.off("edit-character");
      socket.emit("leave-character-server", serverId);
    };
  }, [serverId]);
  return (
    <div className="scrollbar-thin flex flex-col gap-4 overflow-auto bg-black25 p-4 dark:bg-black75">
      <h3 className="mx-auto text-lg font-bold dark:text-white">
        Latest Characters
      </h3>
      {characters.map((character) => (
        <div
          key={character.base.id}
          className="flex flex-row rounded-lg bg-black50 p-4 shadow dark:bg-black85"
        >
          <div className="me-4 flex h-12 w-12 items-center justify-center">
            {character.base.image ? (
              <ClientIcon filename={character.base.image} alt="profile image" />
            ) : (
              <MaterialSymbolsProfile width={30} height={30} />
            )}
          </div>
          <div className="flex flex-auto flex-col items-start">
            <p className="text-sm font-bold text-white">
              {character.base.name}
            </p>
            <p className="text-sm text-white dark:text-black25">
              HP: {character.vitals}/{character.vitals_max}
            </p>
          </div>
          <div className="flex flex-auto flex-col items-end">
            <p className="text-sm text-white dark:text-black25">
              {character.class}
            </p>
            <p className="text-sm text-white dark:text-black25">
              Level {character.level}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
