import type { Metadata } from "next";
import AdminDashboardShell from "@/components/admin/AdminDashboardShell";
import AdminInventoryPage from "@/components/admin/AdminInventoryPage";

export const metadata: Metadata = {
  title: "Inventory | Gadget Grove",
  description: "Review and adjust sample Gadget Grove inventory.",
};

export default function AdminInventoryRoute() {
  return (
    <AdminDashboardShell>
      <AdminInventoryPage />
    </AdminDashboardShell>
  );
}
