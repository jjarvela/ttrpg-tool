import FileInput from "@/app/_components/inputs/FileInput";
import TextAreaInput from "@/app/_components/inputs/TextAreaInput";
import TextInput from "@/app/_components/inputs/TextInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightImageOutlineRounded from "@/public/icons/MaterialSymbolsLightImageOutlineRounded";

export default function BaseForm({
  isPending,
  baseData,
  setBaseData,
}: {
  isPending: boolean;
  baseData: { name: string; description: string; image: File | undefined };
  setBaseData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      image: File | undefined;
    }>
  >;
}) {
  return (
    <RowWrapper breakPoint="sm" justify="flex-col-reverse justify-items-start">
      <div className="relative flex h-44 w-[10rem] items-center justify-center overflow-hidden border-[1px] border-black50">
        {
          /*Icon display priority: icon remove selected => icon uploaded => user original icon */
          baseData.image && (
            <img
              src={URL.createObjectURL(baseData.image)}
              className="absolute left-0 top-0 z-0 min-h-[100%] min-w-[100%] object-cover"
              alt="portrait preview"
            />
          )
        }
        <FileInput
          id="character-portrait"
          accept=".jpg, .png, .svg, .gif"
          labelElement={
            <MaterialSymbolsLightImageOutlineRounded className="text-2xl" />
          }
          onChange={(e) => {
            setBaseData({
              ...baseData,
              image: e.target.files ? e.target.files[0] : undefined,
            });
          }}
          disabled={isPending}
        />
      </div>
      <ColumnWrapper align="items-start">
        <RowWrapper className="flex-wrap text-xl">
          <label htmlFor="character-name">Character name</label>
          <TextInput
            id="character-name"
            value={baseData.name}
            onChange={(e) => setBaseData({ ...baseData, name: e.target.value })}
            required
          />
        </RowWrapper>
        <label htmlFor="description">Description</label>
        <TextAreaInput
          className="w-full"
          value={baseData.description}
          onChange={(e) =>
            setBaseData({ ...baseData, description: e.target.value })
          }
        />
      </ColumnWrapper>
    </RowWrapper>
  );
}
