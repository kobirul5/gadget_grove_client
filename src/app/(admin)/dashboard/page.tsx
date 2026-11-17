import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminDashboardShell from "@/components/admin/AdminDashboardShell";

export const metadata: Metadata = {
  title: "Dashboard | Gadget Grove",
  description: "View Gadget Grove store products and locally saved orders.",
};

export default function AdminDashboardPage() {
  return (
    <AdminDashboardShell>
      <AdminDashboard />
    </AdminDashboardShell>
  );
}
