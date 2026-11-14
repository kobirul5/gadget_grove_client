import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "100% Genuine",
    detail: "Authentic products",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    detail: "Nationwide shipping",
  },
  {
    icon: BadgeCheck,
    title: "Official Warranty",
    detail: "Shopping with confidence",
  },
  {
    icon: ArrowRight,
    title: "Easy Returns",
    detail: "7-day return policy",
  },
];

export default function HeroSection() {
  return (
    <section className="bg-background-soft">
      <div className="mx-auto max-w-7xl px-4 pt-5 pb-8 sm:px-6 sm:pt-7 sm:pb-10 lg:px-8">
        <div className="grid gap-3 md:grid-cols-[1.7fr_0.9fr]">
          <div className="relative isolate flex min-h-64 overflow-hidden rounded-2xl bg-footer text-footer-foreground sm:min-h-80">
            <div
              aria-label="New generation smartphone"
              className="absolute inset-0 bg-cover bg-center opacity-55 sm:inset-y-0 sm:right-0 sm:left-[30%]"
              role="img"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1400&q=85")',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-footer via-footer/85 to-footer/15" />
            <div className="relative z-10 flex max-w-lg flex-col justify-center p-6 sm:p-9">
              <p className="text-xs text-footer-foreground/75">
                introducing the new
              </p>
              <h1 className="mt-2 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
                Galaxy S Series
                <span className="mt-1 block text-primary">Made for more.</span>
              </h1>
              <p className="mt-3 max-w-sm text-xs leading-5 text-footer-foreground/75 sm:text-sm">
                Meet the next generation of everyday performance.
              </p>
              <Link
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                href="#new-trends"
              >
                Explore the range
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
              <div
                aria-label="Slide 1 of 3"
                className="mt-6 flex items-center gap-1.5"
              >
                <span className="h-1 w-6 rounded-full bg-primary" />
                <span className="size-1.5 rounded-full bg-footer-foreground/40" />
                <span className="size-1.5 rounded-full bg-footer-foreground/40" />
              </div>
            </div>
          </div>

          <div className="relative flex min-h-48 items-end overflow-hidden rounded-2xl bg-background-soft p-5 sm:min-h-64 sm:p-7">
            <div
              aria-label="Colorful smartphones"
              className="absolute inset-0 bg-cover bg-center"
              role="img"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1000&q=85")',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/35 to-transparent" />
            <div className="relative z-10">
              <p className="text-[10px] font-semibold tracking-widest text-primary uppercase">
                The everyday upgrade
              </p>
              <h2 className="mt-1 max-w-xs text-xl font-semibold text-text-primary sm:text-2xl">
                Find your perfect match.
              </h2>
              <Link
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary"
                href="#featured-products"
              >
                Shop smartphones
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {benefits.map((benefit) => (
            <div className="flex items-center gap-2.5" key={benefit.title}>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <benefit.icon aria-hidden="true" className="size-4" />
              </span>
              <span>
                <strong className="block text-[11px] font-semibold text-text-primary">
                  {benefit.title}
                </strong>
                <span className="text-[10px] text-text-secondary">
                  {benefit.detail}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
