"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const TipTapEditor = ({
  initialContent,
  onContentChange,
  disabled,
}: {
  documentName: string;
  initialContent: string;
  onContentChange: (content: string) => void;
  disabled?: boolean;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    editable: !disabled,
    autofocus: "start",
  });

  // Effect to update the editor content when initialContent changes
  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const updateContent = () => {
      const newContent = editor.getHTML();
      onContentChange(newContent);
    };

    editor.on("update", updateContent);

    return () => {
      editor.off("update", updateContent);
    };
  }, [editor, onContentChange]);

  const borderStyle = disabled
    ? "border-0"
    : "border border-dashed border-gray-300/50";

  return (
    <div className={borderStyle}>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;