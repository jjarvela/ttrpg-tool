import FileInput from "@/app/_components/inputs/FileInput";
import TextAreaInput from "@/app/_components/inputs/TextAreaInput";
import TextInput from "@/app/_components/inputs/TextInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import MaterialSymbolsLightImageOutlineRounded from "@/public/icons/MaterialSymbolsLightImageOutlineRounded";
import { Fragment } from "react";

type ServerInfoProps = {
  serverData: { server_name: string; description: string };
  setServerData: React.Dispatch<
    React.SetStateAction<{ server_name: string; description: string }>
  >;
  icon: File | undefined;
  setIcon: React.Dispatch<React.SetStateAction<File | undefined>>;
  isPending: boolean;
};

export default function ServerInfoForm({
  serverData,
  setServerData,
  icon,
  setIcon,
  isPending,
}: ServerInfoProps) {
  return (
    <Fragment>
      <h1>Server Information</h1>
      <ColumnWrapper
        mode="section"
        id="server-information"
        align="content-start items-start"
        className="m-0 md:ml-6"
      >
        <TextInput
          className="self-start px-2 py-0 text-xl"
          placeholder="Server name"
          value={serverData.server_name}
          onChange={(e) =>
            setServerData({ ...serverData, server_name: e.target.value })
          }
          required
          endElement={<span className="text-warning">*</span>}
          disabled={isPending}
        />

        <h4 className="mt-5">Server icon</h4>
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-[3px] border-dashed border-black50">
          {icon && (
            <img
              src={URL.createObjectURL(icon)}
              className="absolute left-0 top-0 z-0 min-h-[100%] min-w-[100%] object-cover"
              alt="icon preview"
            />
          )}
          <FileInput
            id="server-icon"
            accept=".jpg, .png, .svg, .gif"
            labelElement={
              <MaterialSymbolsLightImageOutlineRounded className="text-2xl" />
            }
            onChange={(e) =>
              setIcon(e.target.files ? e.target.files[0] : undefined)
            }
            disabled={isPending}
          />
        </div>

        <h4 className="mt-5">Server description</h4>
        <TextAreaInput
          borderless
          className="w-[80%] bg-black25 dark:bg-black75"
          maxLength={200}
          value={serverData.description}
          onChange={(e) =>
            setServerData({ ...serverData, description: e.target.value })
          }
          disabled={isPending}
        />
      </ColumnWrapper>
    </Fragment>
  );
}
