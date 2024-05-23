import type { Metadata } from "next";
import { Inter, Quattrocento_Sans } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const quattrocento = Quattrocento_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-quattrocentosans",
});

export const metadata: Metadata = {
  title: "TTRPG Tool",
  description: "The go-to tool for brining the tabletop to the desktop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${quattrocento.variable} ${inter.variable}`}>
      <body className="bg-color-default text-color-default">
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
  );
}
