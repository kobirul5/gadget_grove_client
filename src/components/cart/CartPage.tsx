"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { getProductSlug } from "@/components/home/data";

function getPriceAmount(price: string) {
  const amount = Number(price.replace(/[^\d]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

function formatPrice(amount: number) {
  return `৳ ${amount.toLocaleString("en-BD")}`;
}

export default function CartPage() {
  const {
    items,
    itemCount,
    isHydrated,
    storageError,
    updateQuantity,
    removeItem,
  } = useCart();
  const subtotal = items.reduce(
    (total, { product, quantity }) =>
      total + getPriceAmount(product.price) * quantity,
    0,
  );

  return (
    <main className="flex-1 bg-background-soft">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-7">
          <p className="text-sm font-medium text-primary">Your selection</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Shopping cart
          </h1>
          {isHydrated ? (
            <p className="mt-2 text-sm text-text-secondary">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          ) : null}
        </div>

        {storageError ? (
          <p
            className="mb-5 rounded-lg border border-error/30 bg-surface px-4 py-3 text-sm text-error"
            role="alert"
          >
            {storageError}
          </p>
        ) : null}

        {!isHydrated ? (
          <div
            className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-text-secondary"
            role="status"
          >
            Loading your cart...
          </div>
        ) : items.length === 0 ? (
          <section className="rounded-2xl border border-border bg-surface px-5 py-12 text-center sm:px-8">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
              <ShoppingBag aria-hidden="true" className="size-6" />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-text-primary">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Browse the store and add something you love.
            </p>
            <Link
              className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              href="/products"
            >
              Browse products
            </Link>
          </section>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <section
              aria-label="Items in your shopping cart"
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <ul className="divide-y divide-border">
                {items.map(({ product, quantity }) => {
                  const productSlug = getProductSlug(product);
                  const productAmount = getPriceAmount(product.price);

                  return (
                    <li
                      className="grid gap-4 p-4 sm:grid-cols-[104px_minmax(0,1fr)_auto] sm:items-center sm:p-5"
                      key={productSlug}
                    >
                      <Link
                        aria-label={`View ${product.name}`}
                        className="relative aspect-square overflow-hidden rounded-xl bg-surface-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        href={`/products/${productSlug}`}
                      >
                        <Image
                          alt=""
                          className="object-contain p-2"
                          fill
                          sizes="(max-width: 640px) 25vw, 104px"
                          src={product.image}
                          unoptimized
                        />
                      </Link>

                      <div className="min-w-0">
                        <p className="text-xs text-text-secondary">
                          {product.category}
                        </p>
                        <Link
                          className="mt-1 block font-semibold text-text-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                          href={`/products/${productSlug}`}
                        >
                          {product.name}
                        </Link>
                        <p className="mt-2 text-sm font-semibold text-primary">
                          {product.price}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <div
                            aria-label={`Quantity of ${product.name}`}
                            className="inline-flex h-9 items-center rounded-lg border border-border bg-surface"
                          >
                            <button
                              aria-label={`Decrease quantity of ${product.name}`}
                              className="grid size-9 place-items-center text-text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
                              disabled={quantity <= 1}
                              onClick={() =>
                                updateQuantity(productSlug, quantity - 1)
                              }
                              type="button"
                            >
                              <Minus aria-hidden="true" className="size-3.5" />
                            </button>
                            <output className="min-w-8 text-center text-sm font-medium text-text-primary">
                              {quantity}
                            </output>
                            <button
                              aria-label={`Increase quantity of ${product.name}`}
                              className="grid size-9 place-items-center text-text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                              onClick={() =>
                                updateQuantity(productSlug, quantity + 1)
                              }
                              type="button"
                            >
                              <Plus aria-hidden="true" className="size-3.5" />
                            </button>
                          </div>
                          <button
                            aria-label={`Remove ${product.name} from cart`}
                            className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-text-secondary transition-colors hover:text-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            onClick={() => removeItem(productSlug)}
                            type="button"
                          >
                            <Trash2 aria-hidden="true" className="size-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>

                      <p className="text-right text-sm font-semibold text-text-primary sm:self-start">
                        {formatPrice(productAmount * quantity)}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-border px-4 py-4 sm:px-5">
                <Link
                  className="text-sm font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  href="/products"
                >
                  Continue shopping
                </Link>
              </div>
            </section>

            <aside className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-text-primary">
                Order summary
              </h2>
              <div className="mt-5 flex items-center justify-between gap-4 text-sm text-text-secondary">
                <span>
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
                <span className="font-semibold text-text-primary">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-4 border-t border-border pt-4 text-xs leading-5 text-text-secondary">
                Shipping and payment are not available yet.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
