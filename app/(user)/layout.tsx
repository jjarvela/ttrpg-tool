import SideMenu from "../_components/SideMenu";

export default function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <SideMenu />
        {children}
      </div>
    </div>
  );
}
