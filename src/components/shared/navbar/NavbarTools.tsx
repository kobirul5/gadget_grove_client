"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Search, ShoppingCart, X } from "lucide-react";
import { allProducts, getProductSlug } from "@/components/home/data";
import { useCart } from "@/components/cart/CartProvider";
import ThemeToggle from "./ThemeToggle";

type OpenPanel = "cart" | "favorites" | null;

export default function NavbarTools() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const { items: cartItems, itemCount, storageError } = useCart();

  const normalizedQuery = query.trim().toLowerCase();
  const results = normalizedQuery
    ? allProducts
        .filter(
          (product) =>
            product.name.toLowerCase().includes(normalizedQuery) ||
            product.category.toLowerCase().includes(normalizedQuery),
        )
        .slice(0, 5)
    : [];

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const firstResult = results[0];

    if (firstResult) {
      setSearchOpen(false);
      router.push(`/products/${getProductSlug(firstResult)}`);
    } else {
      setSearchOpen(true);
    }
  }

  return (
    <>
      <form
        aria-label="Search products"
        className="relative col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1"
        onSubmit={handleSearch}
        role="search"
      >
        <label className="sr-only" htmlFor="navbar-product-search">
          Search products
        </label>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-text-secondary"
        />
        <input
          aria-autocomplete="list"
          aria-controls="navbar-search-results"
          aria-expanded={searchOpen && normalizedQuery.length > 0}
          autoComplete="off"
          className="h-10 w-full rounded-full border border-border bg-surface-secondary py-2 pr-10 pl-10 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15"
          id="navbar-product-search"
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setSearchOpen(true);
            setOpenPanel(null);
          }}
          onFocus={() => setSearchOpen(true)}
          placeholder="Search products, brands..."
          role="combobox"
          value={query}
        />
        {query ? (
          <button
            aria-label="Clear search"
            className="absolute top-1/2 right-3 grid size-6 -translate-y-1/2 place-items-center rounded-full text-text-secondary hover:bg-background hover:text-text-primary focus-visible:outline-2 focus-visible:outline-primary"
            onClick={() => {
              setQuery("");
              setSearchOpen(false);
            }}
            type="button"
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        ) : null}
        {searchOpen && normalizedQuery ? (
          <div
            className="absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-lg shadow-primary/10"
            id="navbar-search-results"
            role="listbox"
          >
            {results.length ? (
              results.map((product) => (
                <Link
                  aria-label={`${product.name}, ${product.price}`}
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-background-soft focus-visible:outline-2 focus-visible:outline-primary"
                  href={`/products/${getProductSlug(product)}`}
                  key={getProductSlug(product)}
                  onClick={() => {
                    setSearchOpen(false);
                    setQuery("");
                  }}
                  role="option"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-text-primary">
                      {product.name}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {product.category}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs font-semibold text-primary">
                    {product.price}
                  </span>
                </Link>
              ))
            ) : (
              <p className="px-3 py-3 text-sm text-text-secondary">
                No matching products found.
              </p>
            )}
          </div>
        ) : null}
      </form>

      <div className="col-start-2 row-start-1 flex items-center justify-end gap-1 md:col-start-3">
        <div className="relative">
          <button
            aria-expanded={openPanel === "favorites"}
            aria-haspopup="dialog"
            aria-label="Favorites"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-surface-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-9"
            onClick={() => {
              setOpenPanel((current) =>
                current === "favorites" ? null : "favorites",
              );
              setSearchOpen(false);
            }}
            type="button"
          >
            <Heart aria-hidden="true" className="size-4" />
          </button>
          {openPanel === "favorites" ? (
            <div
              aria-label="Favorites"
              className="absolute top-full right-0 z-50 mt-2 w-64 rounded-xl border border-border bg-surface p-4 shadow-lg shadow-primary/10"
              role="dialog"
            >
              <p className="text-sm font-semibold text-text-primary">
                Your favorites
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                Save a product you love and it will show up here.
              </p>
              <Link
                className="mt-3 inline-flex text-xs font-semibold text-primary hover:underline"
                href="/#featured-products"
                onClick={() => setOpenPanel(null)}
              >
                Browse products
              </Link>
            </div>
          ) : null}
        </div>

        <div className="relative">
          <button
            aria-expanded={openPanel === "cart"}
            aria-haspopup="dialog"
            aria-label={`Shopping cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-surface-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-9"
            onClick={() => {
              setOpenPanel((current) => (current === "cart" ? null : "cart"));
              setSearchOpen(false);
            }}
            type="button"
          >
            <ShoppingCart aria-hidden="true" className="size-4" />
            {itemCount > 0 ? (
              <span
                aria-hidden="true"
                className="absolute -top-1 -right-1 grid min-h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground"
              >
                {itemCount}
              </span>
            ) : null}
          </button>
          {openPanel === "cart" ? (
            <div
              aria-label="Shopping cart"
              className="absolute top-full right-0 z-50 mt-2 w-64 rounded-xl border border-border bg-surface p-4 shadow-lg shadow-primary/10"
              role="dialog"
            >
              <p className="text-sm font-semibold text-text-primary">
                Your cart
              </p>
              {storageError ? (
                <p className="mt-2 text-xs text-error" role="alert">
                  {storageError}
                </p>
              ) : null}
              {cartItems.length ? (
                <ul className="mt-3 max-h-64 space-y-3 overflow-y-auto">
                  {cartItems.map(({ product, quantity }) => (
                    <li
                      className="flex items-start justify-between gap-3 border-t border-border pt-3"
                      key={getProductSlug(product)}
                    >
                      <span className="min-w-0 text-xs text-text-primary">
                        <span className="block truncate font-medium">
                          {product.name}
                        </span>
                        <span className="mt-1 block text-text-secondary">
                          Qty: {quantity}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs font-semibold text-primary">
                        {product.price}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-xs text-text-secondary">
                  Your cart is empty. Add a product to get started.
                </p>
              )}
              <Link
                className="mt-3 inline-flex text-xs font-semibold text-primary hover:underline"
                href="/#featured-products"
                onClick={() => setOpenPanel(null)}
              >
                Browse products
              </Link>
            </div>
          ) : null}
        </div>

        <ThemeToggle />
        <Link
          className="inline-flex min-h-8 shrink-0 items-center justify-center rounded-full bg-primary px-3 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:min-h-9 sm:px-4"
          href="/login"
        >
          Sign in
        </Link>
      </div>
    </>
  );
}
