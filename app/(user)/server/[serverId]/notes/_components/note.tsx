"use client";
import React, { useCallback, useEffect, useState } from "react";
import RadixIconsDragHandleDots2 from "@/public/icons/RadixIconsDragHandleDots2";
import { useDraggable } from "@dnd-kit/core";
import handleNoteContentChange from "@/actions/notesManagement/updateNote";
import handleNotePositionChange from "@/actions/notesManagement/handleNotePosition";
import { NoteData } from "../page";
import handleNoteDelete from "@/actions/notesManagement/handleNoteDelete";
import TipTapEditor from "./TipTapEditor";
import { socket } from "@/socket";

const NoteSize = {
  width: "140px",
  minHeight: "140px",
};

export function Note({
  note,
  styles,
  onNoteDelete,
  currentUser,
}: {
  note: NoteData;
  styles?: React.CSSProperties;
  onNoteDelete: (noteId: string) => void;
  currentUser: string;
}) {
  const { id, author, documentName, content, positionX, positionY } = note;

  const isCurrentUserAuthor = author === currentUser;

  const [currentContent, setCurrentContent] = useState(content);

  useEffect(() => {
    // Update current content when the note content changes
    setCurrentContent(content);
  }, [content]);

  useEffect(() => {
    const handleUpdateNoteContent = (updatedNote: NoteData) => {
      console.log("Received updated note:", updatedNote);
      if (updatedNote.id === id) {
        setCurrentContent(updatedNote.content);
      }
    };

    socket.on("update-note", handleUpdateNoteContent);

    return () => {
      console.log("Removing socket listener for update-note");
      socket.off("update-note", handleUpdateNoteContent);
    };
  }, [id]);

  const handleContentChange = useCallback(
    async (newContent: string) => {
      try {
        await handleNoteContentChange(id, newContent);
        setCurrentContent(newContent); // Update current content locally
        socket.emit("update-note", { ...note, content: newContent });
      } catch (error) {
        console.error("Error updating note content:", error);
      }
    },
    [id, note],
  );

  const handlePositionChange = useCallback(
    async (newPositionX: number, newPositionY: number) => {
      try {
        await handleNotePositionChange(id, newPositionX, newPositionY);
      } catch (error) {
        console.error("Error updating note position:", error);
      }
    },
    [id],
  );

  const handleNoteDeletion = useCallback(async () => {
    try {
      await handleNoteDelete(id);
      setIsDeleted(true); // Trigger fade-out animation
      setTimeout(() => {
        onNoteDelete(id); // Remove the note from UI
        socket.emit("delete-note", id); // Emit delete event to the server
      }, 300);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }, [id, onNoteDelete]);

  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id,
  });
  const [isDeleted, setIsDeleted] = useState(false);
  const [isNewNote, setIsNewNote] = useState(true);

  useEffect(() => {
    if (isNewNote) {
      setIsNewNote(false);
    }
  }, [isNewNote]);

  useEffect(() => {
    if (isDeleted) {
      setIsDeleted(true);
    }
  }, [isDeleted]);

  useEffect(() => {
    if (!transform) return;
    const newPositionX = positionX + transform.x;
    const newPositionY = positionY + transform.y;
    handlePositionChange(newPositionX, newPositionY);
  }, [transform, handlePositionChange, positionX, positionY]);

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    ...NoteSize,
    ...styles,
    opacity: isDeleted || isNewNote ? 0 : 1,
    transition: "opacity 0.3s ease-in",
  };

  return (
    <div
      className={`flex flex-col border border-black50 bg-green-800 p-1 shadow-xl`}
      style={style}
      ref={setNodeRef}
    >
      <div className="mb-2 flex justify-center text-center">
        {author && <p>{author}</p>}
      </div>
      {isCurrentUserAuthor && (
        <div className="pointer-events-auto absolute right-1 top-0 justify-end transition-transform hover:rotate-90">
          <button onClick={handleNoteDeletion}>x</button>
        </div>
      )}

      <div className="flex-grow">
        <TipTapEditor
          documentName={documentName}
          initialContent={currentContent}
          onContentChange={handleContentChange}
          disabled={!isCurrentUserAuthor}
        />
      </div>
      {isCurrentUserAuthor && (
        <button className="my-1 h-4 w-full" {...listeners} {...attributes}>
          <RadixIconsDragHandleDots2 className="mx-auto h-5 w-5" />
        </button>
      )}
    </div>
  );
}
