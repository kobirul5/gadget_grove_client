import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";
import { featuredProducts } from "./data";

export default function FeaturedProductsSection() {
  return (
    <section
      aria-labelledby="featured-products-heading"
      className="bg-background-soft"
      id="featured-products"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <SectionTitle
          eyebrow="Handpicked for you"
          href="#flash-sale"
          title="Featured Products"
          titleId="featured-products-heading"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
