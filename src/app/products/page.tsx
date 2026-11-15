import type { Metadata } from "next";
import { Suspense } from "react";
import ProductListingClient from "@/components/products/ProductListingClient";

export const metadata: Metadata = {
  title: "All Products | Gadget Grove",
  description:
    "Browse and filter products from the Gadget Grove sample catalog.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex-1 bg-background-soft">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-sm text-text-secondary" role="status">
              Loading products...
            </p>
          </div>
        </main>
      }
    >
      <ProductListingClient />
    </Suspense>
  );
}
