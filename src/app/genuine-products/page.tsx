import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  FileText,
  ScanLine,
} from "lucide-react";
import { featuredProducts } from "@/components/home/data";

export const metadata: Metadata = {
  title: "Genuine Products | Gadget Grove",
  description:
    "Know what to check on a gadget listing, its packaging, and warranty before you buy.",
};

const checks = [
  {
    icon: FileText,
    title: "Check the exact model",
    description:
      "Compare the model name, configuration, and condition on the listing with what you meant to order.",
  },
  {
    icon: Box,
    title: "Look over the packaging",
    description:
      "When your order arrives, check the seal and packaging before opening. If anything seems off, pause and get in touch with the seller.",
  },
  {
    icon: ScanLine,
    title: "Keep your proof of purchase",
    description:
      "Hold on to your invoice and check the product page for warranty coverage. Terms can vary from one item to another.",
  },
];

export default function GenuineProductsPage() {
  const featuredProduct = featuredProducts[3];

  return (
    <main className="bg-background text-text-primary">
      <section className="bg-background-soft">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-18 md:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <BadgeCheck aria-hidden="true" className="size-5" />
              The details matter
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Genuine products.
              <span className="mt-1 block text-primary">
                Confidence in every detail.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
              Buying a new gadget should feel exciting, not uncertain. Start
              with the product details, know what to check when it arrives, and
              keep the paperwork that comes with it.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                href="/products"
              >
                Browse products
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                className="inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-semibold text-text-primary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                href="/delivery"
              >
                Delivery information
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div
              aria-label={featuredProduct.name}
              className="aspect-[1.16/1] overflow-hidden rounded-2xl border border-border bg-surface-secondary bg-cover bg-center shadow-sm"
              role="img"
              style={{ backgroundImage: `url("${featuredProduct.image}")` }}
            />
            <div className="absolute inset-x-4 bottom-4 rounded-xl border border-border/80 bg-surface/95 p-4 shadow-lg backdrop-blur-sm sm:inset-x-6 sm:bottom-6 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Before you buy
              </p>
              <p className="mt-1.5 text-lg font-semibold">
                Know exactly what’s in the box.
              </p>
              <p className="mt-1 text-sm leading-6 text-text-secondary">
                Model, condition, and warranty details are worth a second look.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="product-checks-heading"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
            A quick checklist
          </p>
          <h2
            className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
            id="product-checks-heading"
          >
            A few details worth checking.
          </h2>
          <p className="mt-3 leading-7 text-text-secondary">
            Small checks make it easier to know what you’re buying and what to
            do if you have a question later.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {checks.map(({ icon: Icon, title, description }, index) => (
            <article
              className="border-t border-border pt-5"
              key={title}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span className="text-sm font-medium tabular-nums text-text-secondary">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 leading-7 text-text-secondary">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-background-soft">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight">
              The right choice starts with the right details.
            </h2>
            <p className="mt-2 leading-6 text-text-secondary">
              Take a look through the range and check each product page for its
              specific information.
            </p>
          </div>
          <Link
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-primary px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            href="/products"
          >
            Explore the collection
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
