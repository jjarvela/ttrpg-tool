import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function UserSideMenuLink({
  title,
  to,
  icon,
  isActive,
  notifications,
}: {
  title: string;
  to: string;
  icon: React.ReactNode;
  isActive: boolean;
  notifications?: boolean;
}) {
  return (
    <Link
      href={to}
      className={twMerge(
        "relative mb-1 flex w-[12.5rem] justify-start gap-2 rounded-lg px-4 py-1 hover:bg-black25 dark:hover:bg-black75",
        isActive && "bg-black25 dark:bg-black75",
      )}
    >
      {icon}
      <h4 className="flex-grow text-center">{title}</h4>
      {notifications && (
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          className="absolute -right-3 top-0 fill-accent dark:fill-primary"
        >
          <circle r={6} cx={8} cy={8} />
        </svg>
      )}
    </Link>
  );
}
