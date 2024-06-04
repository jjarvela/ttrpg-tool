import Link from "next/link";

export default function UserSideMenuLink({
  title,
  to,
  icon,
}: {
  title: string;
  to: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={to}
      className="flex w-[10.5rem] justify-center gap-2 rounded-lg py-2 hover:bg-black25 dark:hover:bg-black75"
    >
      {icon}
      <h4>{title}</h4>
    </Link>
  );
}
