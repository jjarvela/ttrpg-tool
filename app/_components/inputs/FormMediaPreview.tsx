interface FormMediaPreviewProps {
  file: File;
}

export default function FormMediaPreview({ file }: FormMediaPreviewProps) {
  if (!file) return <div></div>;
  const url = URL.createObjectURL(file);

  return (
    <div className="relative h-[8rem] w-[8rem] overflow-hidden rounded-xl border-[1px] border-black50">
      {file.type.includes("image") ? (
        <img
          className="min-h-[100%] min-w-[100%] object-cover"
          src={url}
          onDrop={() => URL.revokeObjectURL(url)}
        />
      ) : (
        <video
          className="min-h-[100%] min-w-[100%] object-cover"
          src={url}
          onDrop={() => URL.revokeObjectURL(url)}
        />
      )}
    </div>
  );
}
