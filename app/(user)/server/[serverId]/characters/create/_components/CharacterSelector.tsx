import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import MaterialSymbolsLightCloseRounded from "@/public/icons/MaterialSymbolsLightCloseRounded";

export default function CharacterSelector({
  refObject,
  children,
}: {
  refObject: React.RefObject<HTMLDialogElement>;
  children: React.ReactNode;
}) {
  return (
    <dialog ref={refObject} className="bg-transparent backdrop:bg-transparent">
      <ColumnWrapper className="bg-color-default text-color-default rounded-lg border-[1px] border-black50">
        <div className="flex w-full justify-end">
          <MaterialSymbolsLightCloseRounded
            className="flex-shrink-0 cursor-pointer text-xl"
            onClick={() => refObject.current?.close()}
          />
        </div>
        <RowWrapper
          align="content-start"
          className="scrollbar-thin h-[60vh] flex-wrap overflow-y-auto"
        >
          {children}
        </RowWrapper>
      </ColumnWrapper>
    </dialog>
  );
}
