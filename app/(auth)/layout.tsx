import SideMenu from "../_components/SideMenu";
import TopMenu from "../_components/TopMenu";

export default function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <SideMenu />
      <div className="flex flex-col">
        <TopMenu />
        <main className="p-4">{children}</main>
      </div>
    </section>
  );
}
