"use client";

import Image from "next/image";
import {
  Boxes,
  CircleCheck,
  PackageOpen,
  Search,
  TriangleAlert,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import DashboardStatCard from "@/components/admin/DashboardStatCard";
import {
  adjustAdminStock,
  getAdminProductStatus,
  getAdminProductsSnapshot,
  getEmptyAdminProductsSnapshot,
  markStockAlertsRead,
  subscribeToAdminProducts,
  type AdminProduct,
} from "@/components/admin/adminProductsStore";

const pageSize = 6;

function StockAdjustDialog({
  product,
  onClose,
}: {
  product: AdminProduct;
  onClose: () => void;
}) {
  const [stock, setStock] = useState(String(product.stock));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(stock);
    if (!Number.isSafeInteger(value) || value < 0) {
      setError("Enter a whole number of zero or more.");
      return;
    }

    if (!adjustAdminStock(product.id, value)) {
      setError("The stock adjustment could not be saved in this browser.");
      return;
    }
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <section
        aria-labelledby="stock-adjust-title"
        aria-modal="true"
        className="w-full rounded-t-2xl border border-border bg-surface p-5 shadow-xl sm:max-w-md sm:rounded-2xl sm:p-6"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <h2
          className="text-lg font-semibold text-text-primary"
          id="stock-adjust-title"
        >
          Adjust stock
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          {product.product.name} · {product.sku}
        </p>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-text-primary"
              htmlFor="adjusted-stock"
            >
              New on-hand quantity
            </label>
            <input
              autoFocus
              className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              id="adjusted-stock"
              min="0"
              onChange={(event) => {
                setError(null);
                setStock(event.target.value);
              }}
              required
              type="number"
              value={stock}
            />
          </div>
          {error ? (
            <p className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
              {error}
            </p>
          ) : null}
          <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
            <button
              className="min-h-10 rounded-lg border border-border px-4 text-sm font-medium text-text-secondary hover:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="min-h-10 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              type="submit"
            >
              Save adjustment
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function AdminInventoryPage() {
  const snapshot = useSyncExternalStore(
    subscribeToAdminProducts,
    getAdminProductsSnapshot,
    getEmptyAdminProductsSnapshot,
  );
  const { products, storageError } = snapshot;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [statusFilter, setStatusFilter] = useState("All status");
  const [page, setPage] = useState(1);
  const [adjustingProduct, setAdjustingProduct] =
    useState<AdminProduct | null>(null);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((item) => {
      const matchesQuery =
        !query ||
        `${item.product.name} ${item.sku} ${item.product.category}`
          .toLowerCase()
          .includes(query);
      const matchesCategory =
        category === "All categories" || item.product.category === category;
      const matchesStatus =
        statusFilter === "All status" ||
        getAdminProductStatus(item) === statusFilter;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [category, products, search, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const lowStockProducts = products.filter(
    (item) => getAdminProductStatus(item) !== "In stock",
  );
  const unreadAlerts = lowStockProducts.filter((item) => !item.alertsRead);
  const inStockCount = products.filter(
    (item) => getAdminProductStatus(item) === "In stock",
  ).length;
  const totalUnits = products.reduce((total, item) => total + item.stock, 0);

  function changeFilter(change: () => void) {
    change();
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Inventory overview
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Sample starting quantities with stock changes saved in this browser.
        </p>
      </div>

      {storageError ? (
        <p
          className="rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error"
          role="alert"
        >
          {storageError}
        </p>
      ) : null}

      <section
        aria-label="Inventory summary"
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        <DashboardStatCard
          hint="Across all products in this browser"
          icon={Boxes}
          label="Total units"
          value={String(totalUnits)}
        />
        <DashboardStatCard
          hint="At or below their reorder threshold"
          icon={TriangleAlert}
          label="Low stock"
          value={String(
            products.filter(
              (item) => getAdminProductStatus(item) === "Low stock",
            ).length,
          )}
        />
        <DashboardStatCard
          hint="Products with no units available"
          icon={PackageOpen}
          label="Out of stock"
          value={String(
            products.filter(
              (item) => getAdminProductStatus(item) === "Out of stock",
            ).length,
          )}
        />
        <DashboardStatCard
          hint="Above the low-stock threshold"
          icon={CircleCheck}
          label="Healthy stock"
          value={String(inStockCount)}
        />
      </section>

      <section
        aria-labelledby="stock-alerts-title"
        className="rounded-2xl border border-border bg-surface p-4 shadow-sm shadow-primary/5 sm:p-5"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              className="font-semibold text-text-primary"
              id="stock-alerts-title"
            >
              Stock alerts
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              {unreadAlerts.length > 0
                ? `${unreadAlerts.length} unread low-stock ${unreadAlerts.length === 1 ? "alert" : "alerts"}`
                : "No unread stock alerts"}
            </p>
          </div>
          <button
            className="min-h-9 self-start rounded-lg border border-border px-3 text-sm font-medium text-text-secondary hover:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
            disabled={unreadAlerts.length === 0}
            onClick={markStockAlertsRead}
            type="button"
          >
            Mark all as read
          </button>
        </div>
        {lowStockProducts.length > 0 ? (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {lowStockProducts.slice(0, 4).map((item) => {
              const isOut = item.stock === 0;
              return (
                <li
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-secondary/60 p-3"
                  key={item.id}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-lg ${
                        isOut
                          ? "bg-error/10 text-error"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      <TriangleAlert aria-hidden="true" className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-text-primary">
                        {item.product.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-text-secondary">
                        {isOut ? "Out of stock" : `${item.stock} left`} ·{" "}
                        {item.sku}
                      </span>
                    </span>
                  </div>
                  <button
                    className="shrink-0 text-sm font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    onClick={() => setAdjustingProduct(item)}
                    type="button"
                  >
                    Restock
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-4 rounded-xl bg-success/10 px-4 py-3 text-sm text-success">
            All products are above their stock thresholds.
          </p>
        )}
      </section>

      <section
        aria-label="Inventory list"
        className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm shadow-primary/5"
      >
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-text-primary">All inventory</h2>
            <p className="mt-1 text-xs text-text-secondary">
              {products.length} products · sample inventory
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="relative">
              <span className="sr-only">Search inventory</span>
              <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary"
              />
              <input
                className="min-h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20"
                onChange={(event) =>
                  changeFilter(() => setSearch(event.target.value))
                }
                placeholder="Search product or SKU"
                type="search"
                value={search}
              />
            </label>
            <label>
              <span className="sr-only">Filter inventory category</span>
              <select
                className="min-h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                onChange={(event) =>
                  changeFilter(() => setCategory(event.target.value))
                }
                value={category}
              >
                <option>All categories</option>
                {Array.from(
                  new Set(products.map((item) => item.product.category)),
                ).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="sm:col-span-2">
              <span className="sr-only">Filter inventory status</span>
              <select
                className="min-h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                onChange={(event) =>
                  changeFilter(() => setStatusFilter(event.target.value))
                }
                value={statusFilter}
              >
                <option>All status</option>
                <option>In stock</option>
                <option>Low stock</option>
                <option>Out of stock</option>
              </select>
            </label>
          </div>
        </div>

        {visibleProducts.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="font-medium text-text-primary">No inventory found</p>
            <p className="mt-1 text-sm text-text-secondary">
              Try a different search or filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-surface-secondary text-[11px] uppercase tracking-wide text-text-secondary">
                <tr>
                  {["Product", "SKU", "Category", "On hand", "Threshold", "Status", "Action"].map((item) => (
                    <th className="px-4 py-3 font-medium" key={item} scope="col">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visibleProducts.map((item) => {
                  const status = getAdminProductStatus(item);
                  return (
                    <tr
                      className="transition-colors hover:bg-surface-secondary/70"
                      key={item.id}
                    >
                      <td className="px-4 py-3">
                        <div className="flex min-w-48 items-center gap-3">
                          <span className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-surface-secondary">
                            <Image
                              alt=""
                              className="object-contain p-1"
                              fill
                              sizes="44px"
                              src={item.product.image}
                              unoptimized
                            />
                          </span>
                          <span className="max-w-48 truncate font-medium text-text-primary">
                            {item.product.name}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-text-secondary">
                        {item.sku}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-text-secondary">
                        {item.product.category}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-text-primary">
                        {item.stock} units
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-text-secondary">
                        {item.threshold} units
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            status === "In stock"
                              ? "bg-success/10 text-success"
                              : status === "Low stock"
                                ? "bg-warning/10 text-warning"
                                : "bg-error/10 text-error"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <button
                          className="font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                          onClick={() => setAdjustingProduct(item)}
                          type="button"
                        >
                          Adjust stock
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-border px-4 py-3 text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing{" "}
            {filteredProducts.length === 0
              ? 0
            : (currentPage - 1) * pageSize + 1}
            –{Math.min(currentPage * pageSize, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>
          <div className="flex items-center gap-2">
            <button
              className="min-h-9 rounded-lg border border-border px-3 hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentPage <= 1}
            onClick={() => setPage(currentPage - 1)}
              type="button"
            >
              Previous
            </button>
            <span aria-live="polite" className="px-1">
              {currentPage} / {pageCount}
            </span>
            <button
              className="min-h-9 rounded-lg border border-border px-3 hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-50"
              disabled={currentPage >= pageCount}
              onClick={() => setPage(currentPage + 1)}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {adjustingProduct ? (
        <StockAdjustDialog
          onClose={() => setAdjustingProduct(null)}
          product={adjustingProduct}
        />
      ) : null}
    </div>
  );
}
