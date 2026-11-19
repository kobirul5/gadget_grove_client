import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  MapPinned,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careful Delivery | Gadget Grove",
  description:
    "Learn how Gadget Grove prepares, dispatches, and handles every delivery.",
};

const deliverySteps = [
  {
    icon: PackageCheck,
    title: "Carefully packed",
    description:
      "Every item is checked and packed securely before it leaves our store.",
  },
  {
    icon: MapPinned,
    title: "Trackable journey",
    description:
      "Your delivery details are organized clearly so you know what to expect.",
  },
  {
    icon: ShieldCheck,
    title: "Protected on arrival",
    description:
      "Cash-on-delivery checkout lets you complete the order at your doorstep.",
  },
];

export default function DeliveryPage() {
  return (
    <main className="bg-background text-text-primary">
      <section className="bg-background-soft">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface px-3 py-1.5 text-sm font-semibold text-primary">
                <Truck aria-hidden="true" className="size-4" />
                The Grove promise
              </div>
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
                Careful delivery,
                <span className="block text-primary">from our store to you.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
                We handle every Gadget Grove order with attention, clear
                communication, and packaging designed to keep your tech safe.
              </p>
              <Link
                className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                href="/products"
              >
                Explore products
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Truck aria-hidden="true" className="size-7" />
              </div>
              <h2 className="mt-6 text-2xl font-bold">Simple at every step</h2>
              <p className="mt-3 leading-7 text-text-secondary">
                Place your order, receive your confirmation, and prepare for a
                carefully handled delivery to the address you provide.
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5 text-sm">
                <Clock3 aria-hidden="true" className="size-5 text-primary" />
                <span className="text-text-secondary">
                  Delivery timing depends on your location and order details.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            How delivery works
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Prepared with care
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {deliverySteps.map(({ icon: Icon, title, description }) => (
            <article
              className="rounded-2xl border border-border bg-surface p-6"
              key={title}
            >
              <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon aria-hidden="true" className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 leading-6 text-text-secondary">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">Ready to find your next gadget?</h2>
            <p className="mt-2 text-text-secondary">
              Browse thoughtfully picked tech for everyday life.
            </p>
          </div>
          <Link
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-primary px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            href="/products"
          >
            Shop Gadget Grove
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
