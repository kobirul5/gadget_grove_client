"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Boxes,
  ClipboardList,
  LayoutDashboard,
  Menu,
  PackageSearch,
  Tags,
  UsersRound,
  X,
} from "lucide-react";
import ThemeToggle from "@/components/shared/navbar/ThemeToggle";

const navigation = [
  { label: "Dashboard", href: "/dashboard#overview", icon: LayoutDashboard },
  { label: "Products", href: "/dashboard/products", icon: Boxes },
  { label: "Inventory", href: "/dashboard/inventory", icon: ClipboardList },
  { label: "Categories", href: "/dashboard#categories", icon: Tags },
  { label: "Orders", href: "/dashboard#orders", icon: PackageSearch },
  { label: "Customers", href: "/dashboard#customers", icon: UsersRound },
];

const pageHeadings: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Store overview" },
  "/dashboard/products": {
    title: "Products",
    subtitle: "Manage your product catalog",
  },
  "/dashboard/inventory": {
    title: "Inventory",
    subtitle: "Track stock and low inventory",
  },
};

export default function AdminDashboardShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const heading = pageHeadings[pathname] ?? pageHeadings["/dashboard"];

  function closeNavigation() {
    setIsMobileNavigationOpen(false);
  }

  return (
    <div className="min-h-screen bg-background-soft text-text-primary">
      {isMobileNavigationOpen ? (
        <button
          aria-label="Close dashboard navigation"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeNavigation}
          type="button"
        />
      ) : null}

      <aside
        aria-label="Dashboard sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-border bg-surface transition-transform ${
          isMobileNavigationOpen
            ? "flex translate-x-0"
            : "hidden -translate-x-full md:flex md:translate-x-0"
        }`}
      >
        <div className="flex min-h-16 items-center justify-between border-b border-border px-5">
          <Link
            aria-label="Gadget Grove dashboard home"
            className="inline-flex items-center gap-2 rounded-lg text-lg font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            href="/dashboard"
            onClick={closeNavigation}
          >
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
              G
            </span>
            <span>
              Gadget <span className="text-primary">Grove</span>
            </span>
          </Link>
          <button
            aria-label="Close dashboard navigation"
            className="grid size-9 place-items-center rounded-lg text-text-secondary hover:bg-surface-secondary md:hidden"
            onClick={closeNavigation}
            type="button"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <div className="border-b border-border px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Workspace
          </p>
        </div>

        <nav aria-label="Dashboard navigation" className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {navigation.map(({ label, href, icon: Icon }) => {
              const isActive =
                (label === "Dashboard" && pathname === "/dashboard") ||
                (label === "Products" && pathname === "/dashboard/products") ||
                (label === "Inventory" &&
                  pathname === "/dashboard/inventory");

              return (
                <li key={label}>
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                    }`}
                    href={href}
                    onClick={closeNavigation}
                  >
                    <Icon aria-hidden="true" className="size-4 shrink-0" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-xl bg-surface-secondary p-3">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
            >
              A
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">
                Store admin
              </span>
              <span className="block text-xs text-text-secondary">
                Local dashboard
              </span>
            </span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      <div className="min-w-0 md:ml-64">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-border bg-surface/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              aria-expanded={isMobileNavigationOpen}
              aria-label={
                isMobileNavigationOpen
                  ? "Close dashboard navigation"
                  : "Open dashboard navigation"
              }
              className="grid size-10 shrink-0 place-items-center rounded-lg border border-border text-text-secondary hover:bg-surface-secondary md:hidden"
              onClick={() =>
                setIsMobileNavigationOpen((isOpen) => !isOpen)
              }
              type="button"
            >
              <Menu aria-hidden="true" className="size-4" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold sm:text-base">
                {heading.title}
              </p>
              <p className="hidden text-xs text-text-secondary sm:block">
                {heading.subtitle}
              </p>
            </div>
          </div>
          <Link
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-4 sm:text-sm"
            href="/products"
          >
            Browse products
          </Link>
        </header>

        <div className="mx-auto w-full max-w-[1500px] p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
