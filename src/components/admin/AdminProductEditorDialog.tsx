"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import {
  addAdminProduct,
  updateAdminProduct,
  type AdminProduct,
} from "@/components/admin/adminProductsStore";
import { allProducts, categories } from "@/components/home/data";

type AdminProductEditorDialogProps = {
  product: AdminProduct | null;
  onClose: () => void;
};

function getPriceAmount(price: string) {
  return price.replace(/[^\d]/g, "");
}

function formatTaka(amount: number) {
  return `৳ ${amount.toLocaleString("en-BD")}`;
}

export default function AdminProductEditorDialog({
  product,
  onClose,
}: AdminProductEditorDialogProps) {
  const [name, setName] = useState(product?.product.name ?? "");
  const [category, setCategory] = useState(
    product?.product.category ?? categories[0]?.name ?? "",
  );
  const [price, setPrice] = useState(
    product ? getPriceAmount(product.product.price) : "",
  );
  const [stock, setStock] = useState(String(product?.stock ?? 0));
  const [threshold, setThreshold] = useState(
    String(product?.threshold ?? 10),
  );
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
    setError(null);
    const priceValue = Number(price);
    const stockValue = Number(stock);
    const thresholdValue = Number(threshold);
    if (
      !name.trim() ||
      !category ||
      !Number.isSafeInteger(priceValue) ||
      priceValue <= 0 ||
      !Number.isSafeInteger(stockValue) ||
      stockValue < 0 ||
      !Number.isSafeInteger(thresholdValue) ||
      thresholdValue < 0
    ) {
      setError("Enter a product name and valid price, stock, and threshold.");
      return;
    }

    const nextProduct: AdminProduct["product"] = product
      ? {
          ...product.product,
          name: name.trim(),
          category,
          price: formatTaka(priceValue),
        }
      : {
          name: name.trim(),
          category,
          price: formatTaka(priceValue),
          oldPrice: formatTaka(priceValue),
          image:
            allProducts[0]?.image ?? "",
        };

    const result = product
      ? {
          saved: updateAdminProduct(product.id, (current) => ({
            ...current,
            product: nextProduct,
            stock: stockValue,
            threshold: thresholdValue,
          })),
        }
      : addAdminProduct({
          product: nextProduct,
          stock: stockValue,
          threshold: thresholdValue,
          online: false,
        });

    if (!result.saved) {
      setError(
        ("reason" in result && result.reason) ||
          "The product could not be saved in this browser.",
      );
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
        aria-labelledby="product-editor-title"
        aria-modal="true"
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl border border-border bg-surface p-5 shadow-xl sm:max-w-lg sm:rounded-2xl sm:p-6"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              className="text-lg font-semibold text-text-primary"
              id="product-editor-title"
            >
              {product ? "Edit product" : "Add product"}
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Changes are saved to this browser only.
            </p>
          </div>
          {product ? (
            <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-surface-secondary">
              <Image
                alt=""
                className="object-contain p-1"
                fill
                sizes="48px"
                src={product.product.image}
                unoptimized
              />
            </span>
          ) : null}
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-text-primary"
              htmlFor="admin-product-name"
            >
              Product name
            </label>
            <input
              autoFocus
              className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              id="admin-product-name"
              maxLength={100}
              onChange={(event) => setName(event.target.value)}
              required
              value={name}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                className="mb-1.5 block text-sm font-medium text-text-primary"
                htmlFor="admin-product-category"
              >
                Category
              </label>
              <select
                className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                id="admin-product-category"
                onChange={(event) => setCategory(event.target.value)}
                required
                value={category}
              >
                {categories.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
                {product &&
                !categories.some((item) => item.name === product.product.category) ? (
                  <option value={product.product.category}>
                    {product.product.category}
                  </option>
                ) : null}
              </select>
            </div>
            <div>
              <label
                className="mb-1.5 block text-sm font-medium text-text-primary"
                htmlFor="admin-product-price"
              >
                Price (৳)
              </label>
              <input
                className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                id="admin-product-price"
                min="1"
                onChange={(event) => setPrice(event.target.value)}
                required
                type="number"
                value={price}
              />
            </div>
            <div>
              <label
                className="mb-1.5 block text-sm font-medium text-text-primary"
                htmlFor="admin-product-stock"
              >
                On hand
              </label>
              <input
                className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                id="admin-product-stock"
                min="0"
                onChange={(event) => setStock(event.target.value)}
                required
                type="number"
                value={stock}
              />
            </div>
            <div>
              <label
                className="mb-1.5 block text-sm font-medium text-text-primary"
                htmlFor="admin-product-threshold"
              >
                Low-stock threshold
              </label>
              <input
                className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                id="admin-product-threshold"
                min="0"
                onChange={(event) => setThreshold(event.target.value)}
                required
                type="number"
                value={threshold}
              />
            </div>
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
              {product ? "Save changes" : "Add product"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
