"use client";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

type UploadFormProps = {
  button: React.ReactNode;
  handleSuccess: (results: CloudinaryUploadWidgetResults) => void;
  folder?: string;
  multiple?: boolean;
  max?: number;
};

export default function UploadForm({
  button,
  handleSuccess,
  folder,
  multiple,
  max,
}: UploadFormProps) {
  return (
    <CldUploadWidget
      options={{
        sources: ["local", "url"],
        folder: folder,
        multiple: multiple,
        maxFiles: max,
      }}
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={(results) => handleSuccess(results)}
    >
      {({ open }) => {
        return <section onClick={() => open()}>{button}</section>;
      }}
    </CldUploadWidget>
  );
}
