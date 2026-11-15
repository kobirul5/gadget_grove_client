import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import NavbarTools from "@/components/shared/NavbarTools";

const categoryItems = [
  "Apple",
  "Tablet & Accessories",
  "Phones",
  "Desktop",
  "Laptops",
  "Gadgets & Accessories",
  "Appliances",
  "Lifestyle",
  "Camera & Networking",
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 px-4 py-3 sm:px-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-5 lg:px-8"
      >
        <Link
          aria-label="Gadget Grove home"
          className="col-start-1 row-start-1 inline-flex w-fit items-center gap-1.5 rounded-lg text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:gap-2"
          href="/"
        >
          <Image
            alt=""
            className="size-8 rounded-lg bg-surface p-0.5 object-contain ring-1 ring-border sm:size-10 sm:rounded-xl"
            height={1280}
            src="/logo.png"
            width={1280}
          />
          <span className="text-sm font-semibold tracking-tight sm:text-lg">
            Gadget <span className="text-primary">Grove</span>
          </span>
        </Link>

        <NavbarTools />

      </nav>

      <nav
        aria-label="Product categories"
        className="border-t border-border"
      >
        <ul className="mx-auto flex min-h-11 max-w-7xl items-center gap-5 overflow-x-auto px-4 [scrollbar-width:none] sm:gap-7 sm:px-6 lg:justify-between lg:gap-3 lg:px-8">
          {categoryItems.map((label) => (
            <li className="shrink-0" key={label}>
              <Link
                className="inline-flex min-h-11 items-center gap-1 text-xs font-medium text-text-primary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                href="/#popular-categories"
              >
                {label}
                <ChevronDown
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-text-secondary"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
