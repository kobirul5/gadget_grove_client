import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { getProductSlug, trendingProducts } from "./data";

export default function TrendingNowSection() {
  return (
    <section
      aria-labelledby="trending-now-heading"
      className="bg-background-soft"
      id="trending-now"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <SectionTitle
          eyebrow="What everyone's talking about"
          href="#top-brand-products"
          title="Trending Now"
          titleId="trending-now-heading"
        />
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {trendingProducts.map((product) => (
            <Link
              className="group flex items-center gap-3 overflow-hidden rounded-xl border border-border/80 bg-surface p-2.5 transition-shadow hover:shadow-md sm:gap-4 sm:p-3"
              href={`/products/${getProductSlug(product)}`}
              key={product.name}
            >
              <div
                aria-label={product.name}
                className="size-20 shrink-0 rounded-lg bg-surface-secondary bg-cover bg-center sm:size-24"
                role="img"
                style={{ backgroundImage: `url("${product.image}")` }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-text-secondary">
                  {product.category}
                </p>
                <h3 className="mt-1 truncate text-sm font-medium text-text-primary">
                  {product.name}
                </h3>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="text-sm font-semibold text-text-primary">
                    {product.price}
                  </span>
                  <span className="text-[10px] text-text-secondary line-through">
                    {product.oldPrice}
                  </span>
                </div>
              </div>
              <ChevronRight
                aria-hidden="true"
                className="mr-1 size-4 shrink-0 text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-primary"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
