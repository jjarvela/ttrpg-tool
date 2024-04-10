import { forwardRef } from "react";

export interface FileInputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  id: string;
  labelElement: React.ReactNode;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ id, labelElement, ...props }, ref) => {
    return (
      <label htmlFor={id} className="cursor-pointer">
        {labelElement}
        <input id={id} type="file" ref={ref} {...props} className="h-0 w-0" />
      </label>
    );
  },
);

FileInput.displayName = "fileInput";

export default FileInput;
