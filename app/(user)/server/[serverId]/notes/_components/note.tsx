"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import RadixIconsDragHandleDots2 from "@/public/icons/RadixIconsDragHandleDots2";
import { useDraggable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import handleNoteContentChange from "@/actions/notesManagement/updateNote";
import { NoteData } from "../page";
import handleNotePositionChange from "@/actions/notesManagement/handleNotePosition";

const CustomStyle = {
  width: "140px",
  minHeight: "140px",
};

const TipTapEditor = ({
  documentName,
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

export function Note({
  note,
  styles,
}: {
  note: NoteData;
  styles?: React.CSSProperties;
}) {
  const { id, author, documentName, content, positionX, positionY } = note;

  const handleContentChange = async (newContent: string) => {
    // Call the server action to update the note content
    try {
      await handleNoteContentChange(id, newContent);
    } catch (error) {
      console.error("Error updating note content:", error);
    }
  };

  const handlePositionChange = async (
    newPositionX: number,
    newPositionY: number,
  ) => {
    // Call the server action to update the note position
    try {
      await handleNotePositionChange(id, newPositionX, newPositionY);
    } catch (error) {
      console.error("Error updating note position:", error);
    }
  };

  const { attributes, listeners, transform } = useDraggable({
    id,
    // Handle drag end event
    onDragEnd: (event: { active: any; over: any }) => {
      const { active, over } = event;
      if (active && over) {
        handlePositionChange(
          positionX + active.rect.left - over.rect.left,
          positionY + active.rect.top - over.rect.top,
        );
      }
    },
  });

  // Calculate the initial position based on the current transform
  const initialPosition = transform
    ? { x: positionX - transform.x, y: positionY - transform.y }
    : { x: positionX, y: positionY };

  const style: React.CSSProperties = {
    transform: `translate3d(${positionX}px, ${positionY}px, 0)`,
    ...CustomStyle,
    ...styles,
  };

  return (
    <div
      className="flex flex-col border border-black50 bg-green-800 p-1 shadow-xl"
      style={{ ...style, ...CustomStyle, ...styles }}
    >
      <div className="mb-2 flex justify-center text-center">{author}</div>

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
