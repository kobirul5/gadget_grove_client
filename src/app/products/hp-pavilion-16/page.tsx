import type { Metadata } from "next";
import ProductDetailPage from "@/components/products/ProductDetailPage";

export const metadata: Metadata = {
  title: "HP Pavilion 16 Ryzen 7 Laptop | Gadget Grove",
  description:
    "Explore the HP Pavilion 16 Ryzen 7 laptop, its specifications, warranty, and included features.",
};

export default function HpPavilionProductPage() {
  return <ProductDetailPage />;
}
