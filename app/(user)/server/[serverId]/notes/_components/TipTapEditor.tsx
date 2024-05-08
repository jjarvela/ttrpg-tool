"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";

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
    extensions: [Document, Text, Paragraph],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
    editable: !disabled,
  });

  return <EditorContent editor={editor} />;
};

export default TipTapEditor;
