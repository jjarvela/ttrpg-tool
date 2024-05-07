import React, { useCallback, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import RadixIconsDragHandleDots2 from "@/public/icons/RadixIconsDragHandleDots2";
import { useDraggable } from "@dnd-kit/core";
import handleNoteContentChange from "@/actions/notesManagement/updateNote";
import handleNotePositionChange from "@/actions/notesManagement/handleNotePosition";
import { NoteData } from "../page";

const NoteSize = {
  width: "140px",
  minHeight: "140px",
};

export function Note({
  note,
  styles,
}: {
  note: NoteData;
  styles?: React.CSSProperties;
}) {
  const { id, author, documentName, content, positionX, positionY } = note;

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

  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id,
  });

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
  };

  return (
    <div
      className="flex flex-col border border-black50 bg-green-800 p-1 shadow-xl"
      style={style}
      ref={setNodeRef}
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
