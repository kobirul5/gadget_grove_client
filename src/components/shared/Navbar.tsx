import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/shared/ThemeToggle";

const navigationItems = [
  { label: "Categories", href: "/#popular-categories" },
  { label: "New Trends", href: "/#new-trends" },
  { label: "Featured Products", href: "/#featured-products" },
  { label: "Flash Sale", href: "/#flash-sale" },
  { label: "Top Brands", href: "/#top-brand-products" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:px-8"
      >
        <Link
          aria-label="Gadget Grove home"
          className="inline-flex w-fit items-center gap-2 rounded-lg text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          href="/"
        >
          <Image
            alt=""
            className="size-10 rounded-xl bg-surface p-0.5 object-contain ring-1 ring-border"
            height={1280}
            src="/logo.png"
            width={1280}
          />
          <span className="text-base font-semibold tracking-tight sm:text-lg">
            Gadget <span className="text-primary">Grove</span>
          </span>
        </Link>

        <ul className="order-3 col-span-2 flex max-w-full items-center gap-1 overflow-x-auto [scrollbar-width:none] lg:order-none lg:col-span-1 lg:justify-center">
          {navigationItems.map((item) => (
            <li className="shrink-0" key={item.label}>
              <Link
                className="inline-flex min-h-9 items-center rounded-full px-3 text-xs font-medium text-text-secondary transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-3.5 sm:text-sm"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            className="inline-flex min-h-9 items-center justify-center rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:px-5 sm:text-sm"
            href="/login"
          >
            Sign in
          </Link>
        </div>
      </nav>
    </header>
  );
}
