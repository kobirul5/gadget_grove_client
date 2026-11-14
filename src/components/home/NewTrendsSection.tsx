import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";
import { newTrends } from "./data";

export default function NewTrendsSection() {
  return (
    <section
      aria-labelledby="new-trends-heading"
      className="bg-background"
      id="new-trends"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <SectionTitle
          eyebrow="Fresh finds"
          href="#featured-products"
          title="New Trends"
          titleId="new-trends-heading"
        />
        <div aria-hidden="true" className="mb-4 flex justify-end gap-2">
          <span className="flex size-8 items-center justify-center rounded-full border border-border text-text-secondary">
            <ChevronLeft className="size-4" />
          </span>
          <span className="flex size-8 items-center justify-center rounded-full bg-text-primary text-background">
            <ChevronRight className="size-4" />
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {newTrends.map((product) => (
            <ProductCard key={product.name} product={product} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
