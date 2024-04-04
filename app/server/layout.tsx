import SideMenu from "../_components/SideMenu";

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideMenu className="m-0" />
      {children}
    </div>
  );
}
