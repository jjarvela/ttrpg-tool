import SideMenu from "../_components/SideMenu";

export default function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="fixed flex h-screen w-screen">
        <SideMenu />
        {children}
      </div>
    </div>
  );
}
