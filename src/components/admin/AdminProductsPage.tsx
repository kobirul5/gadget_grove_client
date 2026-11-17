"use client";

import Image from "next/image";
import {
  Boxes,
  Download,
  PackageCheck,
  PackageX,
  Plus,
  Search,
  TriangleAlert,
} from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import DashboardStatCard from "@/components/admin/DashboardStatCard";
import AdminProductEditorDialog from "@/components/admin/AdminProductEditorDialog";
import {
  getAdminProductStatus,
  getAdminProductsSnapshot,
  removeAdminProduct,
  subscribeToAdminProducts,
  updateAdminProduct,
  getEmptyAdminProductsSnapshot,
  type AdminProduct,
} from "@/components/admin/adminProductsStore";
import { formatPrice } from "@/components/orders/orders";
import { categories } from "@/components/home/data";

const pageSize = 5;

function getPriceValue(price: string) {
  return Number(price.replace(/[^\d]/g, "")) || 0;
}

function downloadCsv(products: AdminProduct[]) {
  const rows = [
    ["Product", "SKU", "Category", "Price", "Stock", "Status", "Published"],
    ...products.map((item) => [
      item.product.name,
      item.sku,
      item.product.category,
      item.product.price,
      String(item.stock),
      getAdminProductStatus(item),
      item.online ? "Yes" : "No",
    ]),
  ];
  const csv = rows
    .map((row) =>
      row.map((field) => `"${field.replaceAll('"', '""')}"`).join(","),
    )
    .join("\r\n");
  const url = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "gadget-grove-products.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminProductsPage() {
  const snapshot = useSyncExternalStore(
    subscribeToAdminProducts,
    getAdminProductsSnapshot,
    getEmptyAdminProductsSnapshot,
  );
  const { products, storageError } = snapshot;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [stockStatus, setStockStatus] = useState("All stock");
  const [sort, setSort] = useState("name");
  const [page, setPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(
    null,
  );
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products
      .filter((item) => {
        const matchesQuery =
          !query ||
          `${item.product.name} ${item.sku} ${item.product.category}`
            .toLowerCase()
            .includes(query);
        const matchesCategory =
          category === "All categories" ||
          item.product.category === category;
        const matchesStock =
          stockStatus === "All stock" ||
          getAdminProductStatus(item) === stockStatus;
        return matchesQuery && matchesCategory && matchesStock;
      })
      .sort((first, second) => {
        if (sort === "price") {
          return (
            getPriceValue(first.product.price) -
            getPriceValue(second.product.price)
          );
        }
        if (sort === "stock") return first.stock - second.stock;
        return first.product.name.localeCompare(second.product.name);
      });
  }, [category, products, search, sort, stockStatus]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const publishedCount = products.filter((item) => item.online).length;
  const lowStockCount = products.filter(
    (item) => getAdminProductStatus(item) !== "In stock",
  ).length;
  const inventoryValue = products.reduce(
    (total, item) => total + getPriceValue(item.product.price) * item.stock,
    0,
  );

  function changeFilter(change: () => void) {
    change();
    setPage(1);
  }

  function handleDelete(product: AdminProduct) {
    if (!window.confirm(`Remove "${product.product.name}" from this local catalog?`)) {
      return;
    }
    removeAdminProduct(product.id);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Product catalog
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Sample catalog and browser-local product management. Publish
            switches are demo status only and do not update the storefront.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-text-primary hover:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={() => downloadCsv(filteredProducts)}
            type="button"
          >
            <Download aria-hidden="true" className="size-4" />
            Export CSV
          </button>
          <button
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={() => setIsAddingProduct(true)}
            type="button"
          >
            <Plus aria-hidden="true" className="size-4" />
            Add product
          </button>
        </div>
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
        aria-label="Product summary"
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        <DashboardStatCard
          hint="Products in this browser catalog"
          icon={Boxes}
          label="Total products"
          value={String(products.length)}
        />
        <DashboardStatCard
          hint="Marked published in this local demo"
          icon={PackageCheck}
          label="Published"
          value={String(publishedCount)}
        />
        <DashboardStatCard
          hint="At or below their stock threshold"
          icon={TriangleAlert}
          label="Low or out of stock"
          value={String(lowStockCount)}
        />
        <DashboardStatCard
          hint="Sample stock multiplied by current price"
          icon={PackageX}
          label="Stock value"
          value={formatPrice(inventoryValue)}
        />
      </section>

      <section
        aria-label="Product list"
        className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm shadow-primary/5"
      >
        <div className="grid gap-3 border-b border-border p-4 sm:grid-cols-2 lg:grid-cols-[minmax(220px,1fr)_190px_170px_160px]">
          <label className="relative">
            <span className="sr-only">Search products</span>
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary"
            />
            <input
              className="min-h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20"
              onChange={(event) =>
                changeFilter(() => setSearch(event.target.value))
              }
              placeholder="Search products or SKU"
              type="search"
              value={search}
            />
          </label>
          <label>
            <span className="sr-only">Filter by category</span>
            <select
              className="min-h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              onChange={(event) =>
                changeFilter(() => setCategory(event.target.value))
              }
              value={category}
            >
              <option>All categories</option>
              {Array.from(
                new Set([
                  ...categories.map((item) => item.name),
                  ...products.map((item) => item.product.category),
                ]),
              ).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Filter by stock status</span>
            <select
              className="min-h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              onChange={(event) =>
                changeFilter(() => setStockStatus(event.target.value))
              }
              value={stockStatus}
            >
              <option>All stock</option>
              <option>In stock</option>
              <option>Low stock</option>
              <option>Out of stock</option>
            </select>
          </label>
          <label>
            <span className="sr-only">Sort products</span>
            <select
              className="min-h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              onChange={(event) =>
                changeFilter(() => setSort(event.target.value))
              }
              value={sort}
            >
              <option value="name">Name: A to Z</option>
              <option value="price">Price: low to high</option>
              <option value="stock">Stock: low to high</option>
            </select>
          </label>
        </div>

        {visibleProducts.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="font-medium text-text-primary">No products found</p>
            <p className="mt-1 text-sm text-text-secondary">
              Try a different search or filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px] text-left text-sm">
              <thead className="bg-surface-secondary text-[11px] uppercase tracking-wide text-text-secondary">
                <tr>
                  {["Product", "SKU", "Category", "Price", "Stock", "Status", "Published", "Actions"].map((item) => (
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
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-text-primary">
                        {item.product.price}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-text-primary">
                        {item.stock}
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
                          aria-label={`${item.online ? "Unpublish" : "Publish"} ${item.product.name}`}
                          aria-pressed={item.online}
                          className={`min-h-9 rounded-full px-3 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                            item.online
                              ? "bg-success/10 text-success"
                              : "bg-surface-secondary text-text-secondary"
                          }`}
                          onClick={() =>
                            updateAdminProduct(item.id, (current) => ({
                              ...current,
                              online: !current.online,
                            }))
                          }
                          type="button"
                        >
                          {item.online ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex items-center gap-3">
                          <button
                            className="font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            onClick={() => setEditingProduct(item)}
                            type="button"
                          >
                            Edit
                          </button>
                          <button
                            className="font-medium text-error hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
                            onClick={() => handleDelete(item)}
                            type="button"
                          >
                            Delete
                          </button>
                        </div>
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

      {isAddingProduct ? (
        <AdminProductEditorDialog
          onClose={() => setIsAddingProduct(false)}
          product={null}
        />
      ) : null}
      {editingProduct ? (
        <AdminProductEditorDialog
          onClose={() => setEditingProduct(null)}
          product={editingProduct}
        />
      ) : null}
    </div>
  );
}
