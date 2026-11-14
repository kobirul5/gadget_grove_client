import Image from "next/image";
import Link from "next/link";
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
    <main className="flex flex-1 items-center justify-center bg-background-soft px-4 py-10 sm:px-6 sm:py-14">
      <section className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <Link
          aria-label="Gadget Grove home"
          className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-lg text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          href="/"
        >
          <Image
            alt=""
            className="size-10 rounded-xl bg-surface p-0.5 object-contain ring-1 ring-border"
            height={1280}
            src="/logo.png"
            width={1280}
          />
          <span className="text-lg font-semibold tracking-tight">
            Gadget <span className="text-primary">Grove</span>
          </span>
        </Link>

        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            {description}
          </p>
        </div>

        {children}

        <div className="mt-6 border-t border-border pt-5 text-center text-sm text-text-secondary">
          {footer}
        </div>
      </section>
    </main>
  );
}
