import SideMenu from "../_components/SideMenu";

export default function ServerLayout({
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
