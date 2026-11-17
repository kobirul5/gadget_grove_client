"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getProductBySlug } from "@/components/home/data";
import {
  formatPrice,
  type Order,
} from "@/components/orders/orders";

export default function RecentOrdersTable({ orders }: { orders: Order[] }) {
  const [search, setSearch] = useState("");
  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return orders;

    return orders.filter((order) => {
      const searchable = [
        order.id,
        order.customer.fullName,
        order.customer.phone,
        ...order.items.map((item) => item.name),
      ]
        .join(" ")
        .toLowerCase();
      return searchable.includes(query);
    });
  }, [orders, search]);

  return (
    <section
      aria-labelledby="recent-orders-title"
      className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm shadow-primary/5"
      id="orders"
    >
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2
            className="font-semibold text-text-primary"
            id="recent-orders-title"
          >
            Recent orders
          </h2>
          <p className="mt-1 text-xs text-text-secondary">
            Orders saved in this browser
          </p>
        </div>
        <label className="sr-only" htmlFor="order-search">
          Search orders
        </label>
        <input
          autoComplete="off"
          className="min-h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 sm:max-w-xs"
          id="order-search"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search order, product or customer"
          type="search"
          value={search}
        />
      </div>

      {orders.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <p className="font-medium text-text-primary">No orders yet</p>
          <p className="mt-2 text-sm text-text-secondary">
            New orders placed in this browser will appear here.
          </p>
          <Link
            className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            href="/products"
          >
            Browse the product catalog
          </Link>
        </div>
      ) : filteredOrders.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-text-secondary">
          No orders match “{search}”.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-surface-secondary text-[11px] uppercase tracking-wide text-text-secondary">
              <tr>
                <th className="px-5 py-3 font-medium" scope="col">
                  Order ID
                </th>
                <th className="px-5 py-3 font-medium" scope="col">
                  Product
                </th>
                <th className="px-5 py-3 font-medium" scope="col">
                  Customer
                </th>
                <th className="px-5 py-3 font-medium" scope="col">
                  Total
                </th>
                <th className="px-5 py-3 font-medium" scope="col">
                  Payment
                </th>
                <th className="px-5 py-3 font-medium" scope="col">
                  Date
                </th>
                <th className="px-5 py-3 font-medium" scope="col">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => {
                const firstItem = order.items[0];
                const product = firstItem
                  ? getProductBySlug(firstItem.productSlug)
                  : undefined;

                return (
                  <tr
                    className="transition-colors hover:bg-surface-secondary/70"
                    key={order.id}
                  >
                    <td className="whitespace-nowrap px-5 py-4">
                      <Link
                        className="font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        href={`/order-confirmation?orderId=${encodeURIComponent(order.id)}`}
                      >
                        #{order.id.slice(0, 8).toUpperCase()}
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-surface-secondary">
                          {product ? (
                            <Image
                              alt=""
                              className="object-contain p-1"
                              fill
                              sizes="40px"
                              src={product.image}
                              unoptimized
                            />
                          ) : null}
                        </span>
                        <span className="max-w-40">
                          <span className="block truncate font-medium text-text-primary">
                            {firstItem?.name ?? "Product unavailable"}
                          </span>
                          {order.items.length > 1 ? (
                            <span className="mt-0.5 block text-xs text-text-secondary">
                              +{order.items.length - 1} more{" "}
                              {order.items.length === 2 ? "product" : "products"}
                            </span>
                          ) : (
                            <span className="mt-0.5 block text-xs text-text-secondary">
                              Qty {firstItem?.quantity ?? 0}
                            </span>
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="block font-medium text-text-primary">
                        {order.customer.fullName}
                      </span>
                      <span className="mt-0.5 block text-xs text-text-secondary">
                        {order.customer.phone}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-text-primary">
                      {formatPrice(order.subtotal)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-text-secondary">
                      {order.paymentMethod}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-text-secondary">
                      {new Date(order.createdAt).toLocaleDateString("en-BD", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="inline-flex rounded-full bg-info/10 px-2.5 py-1 text-xs font-medium text-info">
                        Order placed
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
