import { twMerge } from "tailwind-merge";

export default function Divider({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        "h-[0-1em] w-full border-b-[1px] border-black50",
        className,
      )}
    ></div>
  );
}
