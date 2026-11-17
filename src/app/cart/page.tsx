import type { Metadata } from "next";
import CartPage from "@/components/cart/CartPage";

export const metadata: Metadata = {
  title: "Shopping Cart | Gadget Grove",
  description: "View and manage the products in your Gadget Grove cart.",
};

export default function CartRoute() {
  return <CartPage />;
}
