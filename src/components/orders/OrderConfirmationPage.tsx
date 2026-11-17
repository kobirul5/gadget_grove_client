"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getProductBySlug } from "@/components/home/data";
import {
  formatPrice,
  readOrder,
  type Order,
} from "@/components/orders/orders";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const cartClearFailed = searchParams.get("cartClear") === "failed";

  return (
    <OrderConfirmationDetails
      cartClearFailed={cartClearFailed}
      key={orderId ?? "missing"}
      orderId={orderId}
    />
  );
}

function OrderConfirmationDetails({
  orderId,
  cartClearFailed,
}: {
  orderId: string | null;
  cartClearFailed: boolean;
}) {
  const [order] = useState<Order | null | undefined>(() => {
    if (typeof window === "undefined") return undefined;
    return orderId ? readOrder(orderId) : null;
  });

  return (
    <main className="flex-1 bg-background-soft">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        {order === undefined ? (
          <p className="text-center text-sm text-text-secondary" role="status">
            Loading order details...
          </p>
        ) : !order ? (
          <section className="rounded-2xl border border-border bg-surface px-5 py-12 text-center sm:px-8">
            <h1 className="text-2xl font-bold text-text-primary">
              Order details not found
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              This order may not be saved in this browser.
            </p>
            <Link
              className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              href="/products"
            >
              Continue shopping
            </Link>
          </section>
        ) : (
          <div className="space-y-5">
            <section className="rounded-2xl border border-border bg-surface px-5 py-8 text-center sm:px-8">
              <span
                aria-hidden="true"
                className="mx-auto grid size-14 place-items-center rounded-full bg-success/10 text-2xl font-bold text-success"
              >
                ✓
              </span>
              <p className="mt-4 text-sm font-semibold text-success">
                Order saved
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                Thank you, {order.customer.fullName}!
              </h1>
              <p className="mt-2 text-sm text-text-secondary">
                Your order reference is{" "}
                <span className="font-semibold text-text-primary">
                  {order.id.slice(0, 8).toUpperCase()}
                </span>
                .
              </p>
              <p className="mx-auto mt-5 max-w-xl rounded-lg border border-warning/30 bg-background-soft px-4 py-3 text-left text-xs leading-5 text-text-secondary">
                This demo order is saved in this browser only. It has not been
                sent to the store or a delivery service.
              </p>
            </section>

            {cartClearFailed ? (
              <p
                className="rounded-lg border border-warning/30 bg-surface px-4 py-3 text-sm text-text-primary"
                role="alert"
              >
                Your order was saved, but the cart could not be cleared. Review
                your cart before placing another order.
              </p>
            ) : null}

            <section className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
              <h2 className="text-lg font-semibold text-text-primary">
                Order summary
              </h2>
              <ul className="mt-4 divide-y divide-border">
                {order.items.map((item) => {
                  const product = getProductBySlug(item.productSlug);

                  return (
                    <li
                      className="flex items-center gap-3 py-4 first:pt-0"
                      key={item.productSlug}
                    >
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-surface-secondary">
                        {product ? (
                          <Image
                            alt=""
                            className="object-contain p-1"
                            fill
                            sizes="64px"
                            src={product.image}
                            unoptimized
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-text-primary">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-text-secondary">
                          {item.quantity} × {item.unitPrice}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-semibold text-text-primary">
                        {formatPrice(item.lineTotal)}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-semibold text-text-primary">
                  {formatPrice(order.subtotal)}
                </span>
              </div>
              <p className="mt-3 text-xs leading-5 text-text-secondary">
                Delivery fee will be confirmed by the store. Payment method:{" "}
                {order.paymentMethod}.
              </p>
            </section>

            <section className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
              <h2 className="text-lg font-semibold text-text-primary">
                Delivery details
              </h2>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-text-secondary">Phone</dt>
                  <dd className="mt-1 text-text-primary">
                    {order.customer.phone}
                  </dd>
                </div>
                {order.customer.email ? (
                  <div>
                    <dt className="text-xs text-text-secondary">Email</dt>
                    <dd className="mt-1 break-all text-text-primary">
                      {order.customer.email}
                    </dd>
                  </div>
                ) : null}
                <div className="sm:col-span-2">
                  <dt className="text-xs text-text-secondary">Address</dt>
                  <dd className="mt-1 text-text-primary">
                    {order.customer.address}, {order.customer.city}
                  </dd>
                </div>
              </dl>
            </section>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                href="/products"
              >
                Continue shopping
              </Link>
              <Link
                className="inline-flex min-h-10 items-center justify-center rounded-lg border border-border bg-surface px-5 text-sm font-semibold text-text-primary transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                href="/"
              >
                Back to home
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
