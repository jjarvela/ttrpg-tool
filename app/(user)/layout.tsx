import SideMenu from "../_components/SideMenu";
import TopMenu from "../_components/TopMenu";

export default function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <TopMenu />
      <div className="flex">
        <SideMenu />
        {children}
      </div>
    </div>
  );
}
