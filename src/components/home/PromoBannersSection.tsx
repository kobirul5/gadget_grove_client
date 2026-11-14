import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PromoBannersSection() {
  return (
    <section
      aria-label="Featured collections"
      className="mx-auto grid max-w-7xl gap-3 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-2 lg:px-8"
    >
      <Link
        className="group relative flex min-h-44 items-end overflow-hidden rounded-xl bg-surface-secondary p-6"
        href="#featured-products"
      >
        <div
          aria-label="Smart watch collection"
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          role="img"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-footer/90 via-footer/40 to-transparent" />
        <div className="relative z-10 max-w-xs text-footer-foreground">
          <p className="text-[10px] font-semibold tracking-widest uppercase">
            Find your rhythm
          </p>
          <h2 className="mt-1 text-xl font-semibold">Smartwatch Collection</h2>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium">
            Explore collection
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </span>
        </div>
      </Link>
      <Link
        className="group relative flex min-h-44 items-end overflow-hidden rounded-xl bg-surface-secondary p-6"
        href="#featured-products"
      >
        <div
          aria-label="Tablet and laptop collection"
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          role="img"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=85")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-footer/90 via-footer/40 to-transparent" />
        <div className="relative z-10 max-w-xs text-footer-foreground">
          <p className="text-[10px] font-semibold tracking-widest uppercase">
            Make room for ideas
          </p>
          <h2 className="mt-1 text-xl font-semibold">iPad Collection</h2>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium">
            Explore collection
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </span>
        </div>
      </Link>
    </section>
  );
}
