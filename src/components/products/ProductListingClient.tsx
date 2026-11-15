"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import ProductCard from "@/components/home/ProductCard";
import { allProducts, type Product } from "@/components/home/data";
import { getProductCategory, type ProductFilter } from "./catalog";

const pageSize = 8;
const defaultFilters: ProductFilter[] = [
  { key: "brand", label: "Brand" },
  { key: "price", label: "Price Range" },
  { key: "availability", label: "Availability" },
];

function getPrice(product: Product) {
  return Number(product.price.replace(/\D/g, ""));
}

function getProductValues(product: Product) {
  return [
    product.name,
    product.category,
    ...Object.values(product.attributes ?? {}),
  ]
    .join(" ")
    .toLowerCase();
}

function containsTerm(text: string, term: string) {
  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[^a-z0-9])${escapedTerm}s?(?:$|[^a-z0-9])`).test(
    text,
  );
}

function matchesCategory(
  product: Product,
  category: string | null,
  parentCategory: string | null,
) {
  if (!category) return true;

  const searchText = getProductValues(product);
  const family = getProductCategory(parentCategory ?? category);

  if (family?.label === category) {
    return family.matchTerms.some((term) => containsTerm(searchText, term));
  }

  return searchText.includes(category.toLowerCase());
}

function getPopularity(product: Product) {
  const label = product.label?.toLowerCase();
  if (label === "popular") return 4;
  if (label === "featured") return 3;
  if (label === "top pick") return 2;
  if (label === "new" || label === "just in") return 1;
  return 0;
}

function getNewestRank(product: Product) {
  if (product.label === "New") return 2;
  if (product.label === "Just in") return 1;
  return 0;
}

function updateQuery(
  update: (params: URLSearchParams) => void,
  method: "pushState" | "replaceState" = "replaceState",
) {
  const params = new URLSearchParams(window.location.search);
  update(params);
  const query = params.toString();
  const url = `${window.location.pathname}${query ? `?${query}` : ""}`;
  window.history[method](null, "", url);
}

function FilterOptions({
  filter,
  products,
  selectedValues,
  onChange,
  priceValues,
  onPriceChange,
}: {
  filter: ProductFilter;
  products: Product[];
  selectedValues: string[];
  onChange: (value: string) => void;
  priceValues: { minPrice: string; maxPrice: string };
  onPriceChange: (key: "minPrice" | "maxPrice", value: string) => void;
}) {
  if (filter.key === "price") {
    return (
      <div className="grid grid-cols-2 gap-2">
        {(["minPrice", "maxPrice"] as const).map((key) => (
          <label className="text-xs text-text-secondary" key={key}>
            {key === "minPrice" ? "Minimum" : "Maximum"}
            <span className="mt-1 flex items-center rounded-md border border-border bg-surface px-2">
              <span aria-hidden="true" className="text-text-secondary">
                ৳
              </span>
              <input
                aria-label={`${filter.label} ${key === "minPrice" ? "minimum" : "maximum"}`}
                className="min-w-0 w-full bg-transparent px-1 py-2 text-sm text-text-primary outline-none placeholder:text-text-secondary focus-visible:ring-2 focus-visible:ring-primary"
                min="0"
                onChange={(event) => onPriceChange(key, event.target.value)}
                placeholder="Any"
                type="number"
                value={priceValues[key]}
              />
            </span>
          </label>
        ))}
      </div>
    );
  }

  const key = filter.key;
  const values = Array.from(
    new Set(
      products
        .map((product) => product.attributes?.[key])
        .filter((value): value is string => Boolean(value)),
    ),
  ).sort((first, second) => first.localeCompare(second));

  if (values.length === 0) {
    return (
      <p className="text-xs text-text-secondary">
        No options in the current sample catalog.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {values.map((value) => (
        <label
          className="flex min-h-7 cursor-pointer items-center gap-2 text-sm text-text-primary"
          key={value}
        >
          <input
            checked={selectedValues.includes(value)}
            className="size-4 accent-primary"
            onChange={() => onChange(value)}
            type="checkbox"
            value={value}
          />
          <span>{value}</span>
        </label>
      ))}
    </div>
  );
}

export default function ProductListingClient() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const parentCategory = searchParams.get("parent");
  const activeCategory = getProductCategory(parentCategory ?? category);
  const filters = activeCategory?.filters ?? defaultFilters;
  const queryString = searchParams.toString();
  const categoryProducts = useMemo(
    () =>
      allProducts.filter((product) =>
        matchesCategory(product, category, parentCategory),
      ),
    [category, parentCategory],
  );
  const filteredProducts = useMemo(() => {
    const params = new URLSearchParams(queryString);
    const minimumPrice = Number(params.get("minPrice"));
    const maximumPrice = Number(params.get("maxPrice"));
    const selectedFilters = filters.filter(
      (filter) => filter.key !== "price",
    );

    return categoryProducts.filter((product) => {
      const price = getPrice(product);
      if (params.has("minPrice") && price < minimumPrice) return false;
      if (params.has("maxPrice") && price > maximumPrice) return false;

      return selectedFilters.every((filter) => {
        if (filter.key === "price") return true;
        const selectedValues = params.getAll(filter.key);
        if (selectedValues.length === 0) return true;
        const productValue = product.attributes?.[filter.key];
        return productValue !== undefined && selectedValues.includes(productValue);
      });
    });
  }, [categoryProducts, filters, queryString]);
  const sort = searchParams.get("sort");
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    if (sort === "price-asc") {
      products.sort((first, second) => getPrice(first) - getPrice(second));
    } else if (sort === "price-desc") {
      products.sort((first, second) => getPrice(second) - getPrice(first));
    } else if (sort === "newest") {
      products.sort((first, second) => getNewestRank(second) - getNewestRank(first));
    } else if (sort === "popular") {
      products.sort((first, second) => getPopularity(second) - getPopularity(first));
    }

    return products;
  }, [filteredProducts, sort]);
  const requestedPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const currentPage = Math.min(requestedPage, pageCount);
  const visibleProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function changeFilter(filterKey: string, value: string) {
    updateQuery((params) => {
      const values = params.getAll(filterKey);
      params.delete(filterKey);
      const nextValues = values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value];
      nextValues.forEach((item) => params.append(filterKey, item));
      params.delete("page");
    });
  }

  function clearFilters() {
    updateQuery((params) => {
      for (const key of Array.from(params.keys())) {
        if (!["category", "parent", "sort"].includes(key)) {
          params.delete(key);
        }
      }
    });
  }

  function changePage(page: number) {
    updateQuery(
      (params) => {
        params.set("page", String(page));
      },
      "pushState",
    );
  }

  const title = category ?? "All Products";

  return (
    <main className="flex-1 bg-background-soft">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-text-secondary">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link className="hover:text-primary" href="/">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-text-primary">
              {title}
            </li>
          </ol>
        </nav>

        <header className="mb-7">
          <p className="mb-1 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            Discover your next favorite
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Browse the products available in our local sample catalog.
          </p>
        </header>

        <div className="grid items-start gap-5 md:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
          <aside aria-label="Product filters">
            <button
              aria-controls="product-filters"
              aria-expanded={mobileFiltersOpen}
              className="mb-3 flex min-h-11 w-full items-center justify-between rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-text-primary focus-visible:outline-2 focus-visible:outline-primary md:hidden"
              onClick={() => setMobileFiltersOpen((open) => !open)}
              type="button"
            >
              Filters
              <ChevronDown
                aria-hidden="true"
                className={`size-4 transition-transform ${mobileFiltersOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={mobileFiltersOpen ? "block" : "hidden md:block"}
              id="product-filters"
            >
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h2 className="text-base font-semibold text-text-primary">
                    Filters
                  </h2>
                  <button
                    className="text-xs font-medium text-primary hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-primary"
                    onClick={clearFilters}
                    type="button"
                  >
                    Clear all
                  </button>
                </div>

                <div className="divide-y divide-border">
                  {filters.map((filter) => (
                    <fieldset className="py-4" key={filter.key}>
                      <legend className="mb-3 text-sm font-semibold text-text-primary">
                        {filter.label}
                      </legend>
                      <FilterOptions
                        filter={filter}
                        onChange={(value) => changeFilter(filter.key, value)}
                        onPriceChange={(key, value) => {
                          updateQuery((params) => {
                            if (value) {
                              params.set(key, value);
                            } else {
                              params.delete(key);
                            }
                            params.delete("page");
                          });
                        }}
                        priceValues={{
                          minPrice: searchParams.get("minPrice") ?? "",
                          maxPrice: searchParams.get("maxPrice") ?? "",
                        }}
                        products={categoryProducts}
                        selectedValues={searchParams.getAll(filter.key)}
                      />
                    </fieldset>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <section aria-label={`${title} products`} className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-3 sm:p-4">
              <p aria-live="polite" className="text-sm text-text-secondary">
                <span className="font-semibold text-text-primary">
                  {sortedProducts.length}
                </span>{" "}
                {sortedProducts.length === 1 ? "product" : "products"}
              </p>
              <label className="flex items-center gap-2 text-xs text-text-secondary">
                Sort by
                <select
                  className="min-h-10 rounded-md border border-border bg-surface px-3 text-sm text-text-primary focus-visible:outline-2 focus-visible:outline-primary"
                  onChange={(event) => {
                    updateQuery((params) => {
                      if (event.target.value) {
                        params.set("sort", event.target.value);
                      } else {
                        params.delete("sort");
                      }
                      params.delete("page");
                    });
                  }}
                  value={searchParams.get("sort") ?? ""}
                >
                  <option value="">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="popular">Popularity</option>
                </select>
              </label>
            </div>

            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.name} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-surface px-5 py-12 text-center">
                <h2 className="text-lg font-semibold text-text-primary">
                  No products found
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                  Try adjusting your filters or choose another category.
                </p>
                <button
                  className="mt-4 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  onClick={clearFilters}
                  type="button"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {sortedProducts.length > 0 ? (
              <nav
                aria-label="Product pages"
                className="mt-6 flex items-center justify-center gap-3"
              >
                <button
                  className="min-h-10 rounded-lg border border-border bg-surface px-4 text-sm text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={currentPage <= 1}
                  onClick={() => changePage(currentPage - 1)}
                  type="button"
                >
                  Previous
                </button>
                <span aria-live="polite" className="text-sm text-text-secondary">
                  Page {currentPage} of {pageCount}
                </span>
                <button
                  className="min-h-10 rounded-lg border border-border bg-surface px-4 text-sm text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={currentPage >= pageCount}
                  onClick={() => changePage(currentPage + 1)}
                  type="button"
                >
                  Next
                </button>
              </nav>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}
