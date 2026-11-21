import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

const shopLinks = [
  { label: "Shop categories", href: "/#popular-categories" },
  { label: "New Trends", href: "/#new-trends" },
  { label: "Featured Products", href: "/#featured-products" },
  { label: "Flash Sale", href: "/#flash-sale" },
];

const accountLinks = [
  { label: "Sign in", href: "/login" },
  { label: "Your account", href: "/account" },
];

export default function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-7 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid gap-10 border-b border-footer-foreground/15 pb-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-8">
          <div className="max-w-sm">
            <Link
              aria-label="Gadget Grove home"
              className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              href="/"
            >
              <Image
                alt=""
                className="size-11 rounded-xl bg-surface p-1 object-contain ring-1 ring-border"
                height={1280}
                src="/logo.png"
                width={1280}
              />
              <span className="text-xl font-semibold tracking-tight">
                Gadget <span className="text-primary">Grove</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-6 text-footer-foreground/65">
              Thoughtful tech, carefully picked. Find the everyday essentials
              that make work, play, and everything in between a little better.
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              href="/#popular-categories"
            >
              Get to know the Grove
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <nav aria-label="Shop">
            <h2 className="text-sm font-semibold">Explore</h2>
            <ul className="mt-4 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    className="text-sm text-footer-foreground/65 transition-colors hover:text-footer-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Your account">
            <h2 className="text-sm font-semibold">Your account</h2>
            <ul className="mt-4 space-y-3">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    className="text-sm text-footer-foreground/65 transition-colors hover:text-footer-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold">The Grove promise</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center gap-3 text-sm text-footer-foreground/65">
                <Truck aria-hidden="true" className="size-4 shrink-0 text-primary" />
                <Link
                  className="transition-colors hover:text-footer-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  href="/delivery"
                >
                  Careful delivery
                </Link>
              </li>
              <li className="flex items-center gap-3 text-sm text-footer-foreground/65">
                <ShieldCheck aria-hidden="true" className="size-4 shrink-0 text-primary" />
                <Link
                  className="transition-colors hover:text-footer-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  href="/genuine-products"
                >
                  Genuine products
                </Link>
              </li>
              <li className="flex items-center gap-3 text-sm text-footer-foreground/65">
                <BadgeCheck aria-hidden="true" className="size-4 shrink-0 text-primary" />
                <Link
                  className="transition-colors hover:text-footer-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  href="/help"
                >
                  Here to help
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs text-footer-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>Gadget Grove. Made for the curious.</p>
          <p className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary" />
            Good tech. Good feeling.
          </p>
        </div>
      </div>
    </footer>
  );
}
