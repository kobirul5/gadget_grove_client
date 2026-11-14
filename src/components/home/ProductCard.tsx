import Link from "next/link";
import type { Product } from "./data";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export default function ProductCard({
  product,
  compact = false,
}: ProductCardProps) {
  return (
    <article className="group min-w-0 overflow-hidden rounded-xl border border-border/80 bg-surface transition-shadow hover:shadow-md hover:shadow-primary/5">
      <div className="relative aspect-[1.08/1] overflow-hidden bg-surface-secondary">
        <div
          aria-label={product.name}
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          role="img"
          style={{ backgroundImage: `url("${product.image}")` }}
        />
        {product.label && (
          <span className="absolute top-2 left-2 rounded-full bg-primary px-2 py-1 text-[9px] font-semibold text-primary-foreground">
            {product.label}
          </span>
        )}
        {!compact && (
          <span className="absolute top-2 right-2 rounded-full bg-primary px-2 py-1 text-[9px] font-semibold text-primary-foreground">
            Sale
          </span>
        )}
      </div>
      <div className={compact ? "p-3" : "p-3.5"}>
        <p className="truncate text-[10px] text-text-secondary">
          {product.category}
        </p>
        <h3 className="mt-1 truncate text-xs font-medium text-text-primary sm:text-sm">
          {product.name}
        </h3>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-sm font-semibold text-text-primary">
            {product.price}
          </span>
          <span className="text-[10px] text-text-secondary line-through">
            {product.oldPrice}
          </span>
        </div>
        {!compact && (
          <Link
            className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-primary/40 px-2 py-2 text-[11px] font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            href={
              product.slug
                ? `/products/${product.slug}`
                : "#featured-products"
            }
          >
            View product
          </Link>
        )}
      </div>
    </article>
  );
}
