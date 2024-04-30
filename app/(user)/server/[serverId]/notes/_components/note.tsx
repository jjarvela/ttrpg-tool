import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import RadixIconsDragHandleDots2 from "@/public/icons/RadixIconsDragHandleDots2";
import { useDraggable } from "@dnd-kit/core";

const CustomStyle = {
  width: "140px",
  minHeight: "140px",
};

const TipTapEditor = ({ documentName }: { documentName: string }) => {
  const editor = useEditor({
    extensions: [Document, Text, Paragraph],
  });

  return <EditorContent editor={editor} />;
};

export function Note({
  id,
  author,
  styles,
  documentName,
}: {
  id: string;
  author: string;
  styles?: React.CSSProperties;
  documentName: string;
}) {
  const { attributes, listeners, transform } = useDraggable({
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
        <TipTapEditor documentName={documentName} />
      </div>
      <button className="my-1 h-4 w-full" {...listeners} {...attributes}>
        <RadixIconsDragHandleDots2 className="mx-auto h-5 w-5" />
      </button>
    </div>
  );
}
