
import "./globals.css";
import Navbar from "../components/Navbar";
import Providers from "../context/Providers";
import type { ReactNode } from "react";

export const metadata = {
  title: "MyStore",
  description: "My simple online store",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
