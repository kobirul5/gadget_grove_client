import type { Metadata } from "next";
import { Suspense } from "react";
import CheckoutPage from "@/components/orders/CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout | Gadget Grove",
  description: "Enter your delivery details and place a Gadget Grove order.",
};

export default function CheckoutRoute() {
  return (
    <Suspense
      fallback={
        <main className="flex-1 bg-background-soft">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-sm text-text-secondary" role="status">
              Loading checkout...
            </p>
          </div>
        </main>
      }
    >
      <CheckoutPage />
    </Suspense>
  );
}
