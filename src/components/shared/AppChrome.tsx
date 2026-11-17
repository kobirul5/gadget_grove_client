"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar/Navbar";

export default function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/dashboard") ?? false;

  if (isDashboardRoute) return children;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
