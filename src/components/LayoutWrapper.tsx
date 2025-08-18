"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  return (
    <>
      {isMainPage && <Header />}
      {children}
      {isMainPage && <Footer />}
    </>
  );
}
