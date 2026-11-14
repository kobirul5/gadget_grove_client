import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";
import { saleProducts } from "./data";

export default function FlashSaleSection() {
  return (
    <section
      aria-labelledby="flash-sale-heading"
      className="bg-background"
      id="flash-sale"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <SectionTitle
          eyebrow="A little something extra"
          href="#trending-now"
          title="Flash Sale"
          titleId="flash-sale-heading"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {saleProducts.map((product, index) => (
            <ProductCard key={`${product.name}-${index}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
