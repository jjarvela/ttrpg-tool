import React, { useCallback, useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDraggable } from "@dnd-kit/core";

interface NoteProps {
  id: string;
  initialPosition: { x: number; y: number };
  text: string;
  onTextChange: (id: string, text: string) => void;
}

const Note: React.FC<NoteProps> = ({
  id,
  initialPosition,
  text,
  onTextChange,
}) => {
  const [position, setPosition] = useState(initialPosition);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const handleDragEnd = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      // Update the position state with the new coordinates
      setPosition((prevPosition) => ({
        x: prevPosition.x + event.movementX,
        y: prevPosition.y + event.movementY,
      }));
      console.log("New Position:", position);
    },
    [position],
  );

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      setPosition((prevPosition) => ({
        x: prevPosition.x + event.changedTouches[0].clientX,
        y: prevPosition.y + event.changedTouches[0].clientY,
      }));
      console.log("New Position:", position);
    },
    [position],
  );

  const editor = useEditor({
    extensions: [StarterKit],
    content: text,
    onUpdate: ({ editor }) => {
      onTextChange(id, editor.getHTML());
    },
  });

  return useMemo(
    () => (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : "none",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "grey",
        }}
        onMouseUp={handleDragEnd}
        onTouchEnd={handleTouchEnd}
      >
        <EditorContent editor={editor} />
      </div>
    ),
    [
      setNodeRef,
      attributes,
      listeners,
      position.x,
      position.y,
      transform,
      handleDragEnd,
      handleTouchEnd,
      editor,
    ],
  );
};

export default Note;
