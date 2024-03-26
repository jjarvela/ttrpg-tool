import SideMenu from "../_components/SideMenu";

export default function LoggedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <SideMenu />
      {children}
    </section>
  );
}
