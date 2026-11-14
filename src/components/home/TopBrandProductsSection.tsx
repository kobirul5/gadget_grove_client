import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";
import { brandProducts, brands } from "./data";

export default function TopBrandProductsSection() {
  return (
    <section
      aria-labelledby="top-brand-products-heading"
      className="bg-background"
      id="top-brand-products"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <SectionTitle
          eyebrow="Brands worth knowing"
          title="Top Brand Products"
          titleId="top-brand-products-heading"
        />
        <div
          aria-label="Featured brands"
          className="mb-6 flex gap-2 overflow-x-auto pb-2"
        >
          {brands.map((brand, index) => (
            <span
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-medium ${
                index === 0
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface-secondary text-text-secondary"
              }`}
              key={brand}
            >
              {brand}
            </span>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {brandProducts.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
