import type { Metadata } from "next";
import AdminDashboardShell from "@/components/admin/AdminDashboardShell";
import AdminProductsPage from "@/components/admin/AdminProductsPage";

export const metadata: Metadata = {
  title: "Products | Gadget Grove",
  description: "Manage the sample Gadget Grove product catalog.",
};

export default function AdminProductsRoute() {
  return (
    <AdminDashboardShell>
      <AdminProductsPage />
    </AdminDashboardShell>
  );
}
