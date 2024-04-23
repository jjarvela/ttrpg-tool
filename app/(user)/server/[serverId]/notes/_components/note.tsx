import React, { ReactNode, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Collaboration from "@tiptap/extension-collaboration";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import * as Y from "yjs";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import RadixIconsDragHandleDots2 from "@/public/icons/RadixIconsDragHandleDots2";
import { useDraggable } from "@dnd-kit/core";

const CustomStyle = {
  width: "140px",
  minHeight: "140px",
};

const TipTapEditorWithCollaboration = ({
  documentName,
  appId,
  token,
}: {
  documentName: string;
  appId: string;
  token: string;
}) => {
  const doc = new Y.Doc();

  useEffect(() => {
    const provider = new TiptapCollabProvider({
      name: documentName,
      appId: appId,
      token: token,
      document: doc,
    });
  }, []);

  const editor = useEditor({
    extensions: [
      Document,
      Text,
      Heading.configure({
        levels: [6],
      }),
      Collaboration.configure({
        document: doc,
      }),
    ],
  });

  return <EditorContent editor={editor} />;
};

export function Note({
  id,
  author,
  styles,
  documentName,
  appId,
  token,
}: {
  id: string;
  author: string;
  content: ReactNode;
  styles?: React.CSSProperties;
  documentName: string;
  appId: string;
  token: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <div
      className="flex flex-col border border-black50 bg-green-800 p-1 shadow-xl"
      style={{ ...style, ...CustomStyle, ...styles }}
    >
      <div className="mb-2 flex justify-center text-center">{author}</div>

      <div className="flex-grow">
        <TipTapEditorWithCollaboration
          documentName={documentName}
          appId={appId}
          token={token}
        />
      </div>
      <button className="my-1 h-4 w-full" {...listeners} {...attributes}>
        <RadixIconsDragHandleDots2 className="mx-auto h-5 w-5" />
      </button>
    </div>
  );
}
