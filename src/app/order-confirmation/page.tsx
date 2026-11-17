import type { Metadata } from "next";
import { Suspense } from "react";
import OrderConfirmationPage from "@/components/orders/OrderConfirmationPage";

export const metadata: Metadata = {
  title: "Order Confirmation | Gadget Grove",
  description: "Review your Gadget Grove order details.",
};

export default function OrderConfirmationRoute() {
  return (
    <Suspense
      fallback={
        <main className="flex-1 bg-background-soft">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-text-secondary" role="status">
              Loading order details...
            </p>
          </div>
        </main>
      }
    >
      <OrderConfirmationPage />
    </Suspense>
  );
}
