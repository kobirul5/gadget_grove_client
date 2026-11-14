import Image from "next/image";
import Link from "next/link";
import { Headphones, Smartphone, Watch } from "lucide-react";
import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

export default function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <main className="flex flex-1 items-center justify-center bg-background-soft px-4 py-8 sm:px-6 sm:py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-sm lg:min-h-[600px] lg:grid-cols-2">
        <aside className="relative hidden overflow-hidden bg-footer p-10 text-footer-foreground lg:flex lg:flex-col lg:justify-between xl:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-36 top-24 size-96 rounded-full border border-primary/20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-36 size-72 rounded-full border border-primary/15"
          />

          <div className="relative z-10">
            <Link
              aria-label="Gadget Grove home"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              href="/"
            >
              <Image
                alt=""
                className="size-11 rounded-xl bg-surface p-1 object-contain"
                height={1280}
                src="/logo.png"
                unoptimized
                width={1280}
              />
              <span className="text-lg font-semibold tracking-tight">
                Gadget Grove
              </span>
            </Link>

            <div className="mt-24 max-w-sm">
              <p className="text-sm font-medium text-footer-foreground/75">
                Thoughtful tech, carefully picked.
              </p>
              <h2 className="mt-4 text-4xl leading-[1.12] font-semibold tracking-tight xl:text-5xl">
                Good tech for all the little things.
              </h2>
              <p className="mt-5 max-w-xs text-sm leading-6 text-footer-foreground/70">
                For work days, weekends, and everything in between. We&apos;re
                glad you&apos;re here.
              </p>
            </div>
          </div>

          <div
            aria-label="Audio, mobile, and wearable gadgets"
            className="relative z-10 mt-12 grid max-w-sm grid-cols-3 gap-3"
          >
            {[
              { label: "Audio", Icon: Headphones },
              { label: "Mobile", Icon: Smartphone },
              { label: "Wearables", Icon: Watch },
            ].map(({ label, Icon }) => (
              <div
                className="rounded-2xl border border-footer-foreground/10 bg-footer-foreground/5 px-3 py-4"
                key={label}
              >
                <Icon
                  aria-hidden="true"
                  className="size-5 text-footer-foreground/80"
                />
                <p className="mt-3 text-xs font-medium text-footer-foreground/80">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </aside>

        <div className="flex flex-col justify-center p-6 sm:p-10 lg:px-12 xl:px-16">
          <Link
            aria-label="Gadget Grove home"
            className="mb-10 inline-flex w-fit items-center gap-2 rounded-lg text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:hidden"
            href="/"
          >
            <Image
              alt=""
              className="size-10 rounded-xl bg-surface p-0.5 object-contain ring-1 ring-border"
              height={1280}
              src="/logo.png"
              unoptimized
              width={1280}
            />
            <span className="text-base font-semibold tracking-tight">
              Gadget <span className="text-primary">Grove</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {description}
            </p>
          </div>

          {children}

          <div className="mt-8 text-sm text-text-secondary">{footer}</div>
        </div>
      </section>
    </main>
  );
}
