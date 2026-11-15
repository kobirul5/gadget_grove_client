import Link from "next/link";
import { getParentProductCategory } from "@/components/products/catalog";
import SectionTitle from "./SectionTitle";
import { categories } from "./data";

export default function PopularCategoriesSection() {
  return (
    <section
      aria-labelledby="popular-categories-heading"
      className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8"
      id="popular-categories"
    >
      <SectionTitle
        eyebrow="Find your next favorite"
        title="Popular Categories"
        titleId="popular-categories-heading"
      />
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 sm:gap-5 lg:grid-cols-8">
        {categories.map((category) => {
          const parent = getParentProductCategory(category.name)?.label ?? category.name;
          const params = new URLSearchParams({
            category: category.name,
            parent,
          });

          return (
            <Link
              className="group flex flex-col items-center gap-2 text-center"
              href={`/products?${params.toString()}`}
              key={category.name}
            >
              <span className="flex size-14 items-center justify-center rounded-full border border-border bg-surface text-primary transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground sm:size-16">
                <category.icon
                  aria-hidden="true"
                  className="size-5 sm:size-6"
                />
              </span>
              <span className="text-[10px] font-medium text-text-primary sm:text-xs">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
