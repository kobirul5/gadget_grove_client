import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CircleHelp,
  LogIn,
  Package,
  ShoppingBag,
  UserRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Your Account | Gadget Grove",
  description:
    "Sign in or create a Gadget Grove account, and find quick links for your shopping.",
};

const accountLinks = [
  {
    icon: ShoppingBag,
    title: "Browse products",
    description: "Explore the gadgets and everyday tech in our collection.",
    href: "/products",
    action: "Shop now",
  },
  {
    icon: Package,
    title: "Your cart",
    description: "Review items you have saved in this browser.",
    href: "/cart",
    action: "View cart",
  },
  {
    icon: CircleHelp,
    title: "Need a hand?",
    description: "Find answers about products, delivery, and checkout.",
    href: "/help",
    action: "Visit help",
  },
];

export default function AccountPage() {
  return (
    <main className="flex-1 bg-background-soft text-text-primary">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section
          aria-labelledby="account-heading"
          className="overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <div className="grid gap-8 p-6 sm:p-9 md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div className="max-w-2xl">
              <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
                <UserRound aria-hidden="true" className="size-6" />
              </span>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                Your Gadget Grove
              </p>
              <h1
                className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
                id="account-heading"
              >
                Your account, all in one place.
              </h1>
              <p className="mt-4 leading-7 text-text-secondary">
                Sign in or create an account to get started. You can also keep
                browsing as a guest.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                href="/login"
              >
                <LogIn aria-hidden="true" className="size-4" />
                Sign in
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-5 text-sm font-semibold text-text-primary transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                href="/register"
              >
                Create an account
              </Link>
            </div>
          </div>

          <div
            className="border-t border-border bg-background-soft px-6 py-4 sm:px-9 sm:py-5 md:px-12"
            role="note"
          >
            <p className="text-sm leading-6 text-text-secondary">
              Account sign-in and registration are previews and are not
              connected to an account service yet. Cart and checkout details
              stay in this browser; demo orders are not sent to the store.
            </p>
          </div>
        </section>

        <section aria-labelledby="account-shortcuts-heading" className="mt-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Quick links
            </p>
            <h2
              className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
              id="account-shortcuts-heading"
            >
              Where would you like to go?
            </h2>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {accountLinks.map(
              ({ icon: Icon, title, description, href, action }) => (
                <article
                  className="flex flex-col rounded-xl border border-border bg-surface p-5"
                  key={title}
                >
                  <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-text-secondary">
                    {description}
                  </p>
                  <Link
                    className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    href={href}
                  >
                    {action}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </article>
              ),
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
