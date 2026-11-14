import Link from "next/link";
import { Button } from "@/components/ui/button";

const navigationItems = ["Team", "Projects", "Calendar", "Reports"];

export default function Navbar() {
  return (
    <header className="mx-4 mt-4">
      <nav
        aria-label="Main navigation"
        className="grid grid-cols-[1fr_auto] items-center gap-y-3 rounded-xl border border-[#2b2b30] bg-[#111111] px-5 py-3 text-sm text-white sm:px-8 md:grid-cols-[1fr_auto_1fr]"
      >
        <Link href="/" className="font-semibold">
          Pill
        </Link>

        <div className="order-3 col-span-2 max-w-full justify-self-center overflow-x-auto rounded-full border border-[#2b2b30] p-1 [scrollbar-width:none] md:order-none md:col-span-1">
          <div className="flex w-max items-center gap-1">
            <Button
              render={<Link href="/dashboard" />}
              aria-current="page"
              variant="default"
              size="lg"
              className="h-8 rounded-full bg-white px-4 text-[#111111] hover:bg-neutral-200"
            >
              Dashboard
            </Button>
            {navigationItems.map((item) => (
              <Button
                key={item}
                render={<a href={`#${item.toLowerCase()}`} />}
                variant="ghost"
                size="lg"
                className="h-8 rounded-full px-4 text-white hover:bg-white/10 hover:text-white"
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        <Button
          render={<a href="#contact" />}
          size="lg"
          className="h-9 justify-self-end rounded-full bg-white px-8 font-semibold text-[#111111] hover:bg-neutral-200"
        >
          Contact
        </Button>
      </nav>
    </header>
  );
}
