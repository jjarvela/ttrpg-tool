/**
 * Reusable component for a static feedback card
 *
 * @param type - Set the card styling based on predetermined styles (error, warning, success or info)
 * @param message - Set the message to be displayed by the card
 */

import { twMerge } from "tailwind-merge";
import RowWrapper from "./wrappers/RowWrapper";
import MaterialSymbolsLightWarningOutlineRounded from "../../icons/MaterialSymbolsLightWarningOutlineRounded";
import MaterialSymbolsLightExclamationRounded from "../../icons/MaterialSymbolsLightExclamationRounded";
import MaterialSymbolsLightCheckCircleOutlineRounded from "../../icons/MaterialSymbolsLightCheckCircleOutlineRounded";
import MaterialSymbolsLightInfoOutlineRounded from "../../icons/MaterialSymbolsLightInfoOutlineRounded";

type FeedbackCardProps = {
  type: "error" | "warning" | "success" | "info";
  message: string;
};

export default function FeedbackCard({ type, message }: FeedbackCardProps) {
  //Set appropriate colours based on card type
  function setTypeClasses() {
    switch (type) {
      case "error":
        return "border-warning bg-warningBg text-warningDark";
      case "warning":
        return "border-accent bg-accent";
      case "success":
        return "border-primary bg-primary";
      case "info":
        return "border-secondary bg-black50";
    }
  }
  return (
    <RowWrapper
      className={twMerge(
        "my-1 rounded-lg border-[1px] bg-opacity-10 px-4 py-2",
        setTypeClasses(),
      )}
    >
      {type === "error" && (
        <MaterialSymbolsLightWarningOutlineRounded className="text-xl" />
      )}
      {type === "warning" && (
        <MaterialSymbolsLightExclamationRounded className="text-xl" />
      )}
      {type === "success" && (
        <MaterialSymbolsLightCheckCircleOutlineRounded className="text-xl" />
      )}
      {type === "info" && (
        <MaterialSymbolsLightInfoOutlineRounded className="text-xl" />
      )}
      <p>{message}</p>
    </RowWrapper>
  );
}
