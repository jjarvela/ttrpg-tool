"use client";
import React, { useCallback, useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import RadixIconsDragHandleDots2 from "@/public/icons/RadixIconsDragHandleDots2";
import { useDraggable } from "@dnd-kit/core";
import handleNoteContentChange from "@/actions/notesManagement/updateNote";
import handleNotePositionChange from "@/actions/notesManagement/handleNotePosition";
import { NoteData } from "../page";
import handleNoteDelete from "@/actions/notesManagement/handleNoteDelete";

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

  console.log(author);

  const handleContentChange = useCallback(
    async (newContent: string) => {
      try {
        await handleNoteContentChange(id, newContent);
      } catch (error) {
        console.error("Error updating note content:", error);
      }
    },
    [id],
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
      setIsDeleted(true);
      setTimeout(() => onNoteDelete(id), 300);
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
      className={`animate-bounce-in flex flex-col border border-black50 bg-green-800 p-1 shadow-xl`}
      style={style}
      ref={setNodeRef}
    >
      <div className="mb-2 flex justify-center text-center">
        {author && <p>{author}</p>}
      </div>
      <div className="pointer-events-auto absolute right-1 top-0 justify-end transition-transform hover:rotate-90">
        <button onClick={handleNoteDeletion}>x</button>
      </div>

      <div className="flex-grow">
        <TipTapEditor
          documentName={documentName}
          initialContent={content}
          onContentChange={handleContentChange}
        />
      </div>
      <button className="my-1 h-4 w-full" {...listeners} {...attributes}>
        <RadixIconsDragHandleDots2 className="mx-auto h-5 w-5" />
      </button>
    </div>
  );
}

const TipTapEditor = ({
  initialContent,
  onContentChange,
}: {
  documentName: string;
  initialContent: string;
  onContentChange: (content: string) => void;
}) => {
  const editor = useEditor({
    extensions: [Document, Text, Paragraph],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  return <EditorContent editor={editor} />;
};
