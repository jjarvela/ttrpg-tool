import SideMenu from "../_components/SideMenu";

export default function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <SideMenu />
      {children}
    </section>
  );
}
