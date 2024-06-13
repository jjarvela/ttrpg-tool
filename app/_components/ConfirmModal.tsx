import MaterialSymbolsLightCloseRounded from "@/public/icons/MaterialSymbolsLightCloseRounded";
import ColumnWrapper from "./wrappers/ColumnWrapper";
import RowWrapper from "./wrappers/RowWrapper";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import Divider from "./Divider";

type ConfirmModalProps = {
  refObject: React.RefObject<HTMLDialogElement>;
  children: React.ReactNode;
  title?: string;
  onConfirm: () => void;
  confirmText?: string;
  confirmButtonClass?: string;
};

/**
 * This component acts as a step between a user choosing an action and taking an action.
 * @param refObject useRef HTMLDialogElement : the ref object pointing to the modal
 * @param children ReactNode : the message to be displayed formatted with HTML tags
 * @param onConfirm ( ) => void :  what should happen when user presses the confirm button
 * @param confirmText string : Optional label for the confirm button. Defaults to "Confirm"
 * @param confirmButtonClass string : Optional classnames for confirm button (eg. "bg-warning" to change the background to red)
 * @returns JSX dialog component
 */

export default function ConfirmModal({
  refObject,
  children,
  title = "Confirm",
  onConfirm,
  confirmText,
  confirmButtonClass,
}: ConfirmModalProps) {

  return (
    <dialog
      ref={refObject}
      className="bg-transparent backdrop:bg-black backdrop:bg-opacity-50"
    >
      <ColumnWrapper className="bg-color-dark text-color-default gap-0 rounded-lg border-[1px] border-black50 px-8 py-4">
        <RowWrapper
          justify="justify-between"
          align="content-start items-start"
          className="w-full border-b-[1px] border-black50 px-2"
        >
          <h5>{title}</h5>
          <MaterialSymbolsLightCloseRounded
            className="cursor-pointer"
            onClick={() => refObject.current?.close()}
          />
        </RowWrapper>
        {children}
        <RowWrapper className="mt-4">
          <Button
            className={twMerge("btn-primary", confirmButtonClass)}
            onClick={() => onConfirm()}
          >
            {confirmText ? confirmText : "Confirm"}
          </Button>
          <Button
            className="btn-secondary"
            onClick={() => refObject.current?.close()}
          >
            Cancel
          </Button>
        </RowWrapper>
      </ColumnWrapper>
    </dialog>
  );
}
