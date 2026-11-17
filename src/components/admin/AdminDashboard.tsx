"use client";

import {
  CircleDollarSign,
  ShoppingBag,
  UsersRound,
  Boxes,
} from "lucide-react";
import { useSyncExternalStore } from "react";
import { getProductBySlug } from "@/components/home/data";
import DashboardStatCard from "@/components/admin/DashboardStatCard";
import {
  getAdminProductsSnapshot,
  getEmptyAdminProductsSnapshot,
  subscribeToAdminProducts,
} from "@/components/admin/adminProductsStore";
import RecentOrdersTable from "@/components/admin/RecentOrdersTable";
import RevenueChart from "@/components/admin/RevenueChart";
import TopCategoriesPanel, {
  type CategorySummary,
} from "@/components/admin/TopCategoriesPanel";
import {
  formatPrice,
  getEmptyOrdersSnapshot,
  getOrdersSnapshot,
  subscribeToOrders,
  type Order,
} from "@/components/orders/orders";

function getMonthlyRevenue(orders: Order[]) {
  const amounts = new Map<string, number>();
  const orderDates = orders
    .map((order) => new Date(order.createdAt))
    .filter((date) => !Number.isNaN(date.getTime()));
  const latestOrderDate = orderDates.reduce<Date | null>(
    (latest, date) =>
      !latest || date.getTime() > latest.getTime() ? date : latest,
    null,
  );
  if (!latestOrderDate) return [];

  const currentMonth = new Date(
    Date.UTC(
      latestOrderDate.getUTCFullYear(),
      latestOrderDate.getUTCMonth(),
      1,
    ),
  );
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      Date.UTC(
        currentMonth.getUTCFullYear(),
        currentMonth.getUTCMonth() - (5 - index),
        1,
      ),
    );
    const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
    return {
      key,
      label: date.toLocaleString("en-US", {
        month: "short",
        timeZone: "UTC",
      }),
    };
  });

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    if (Number.isNaN(date.getTime())) return;
    const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
    amounts.set(key, (amounts.get(key) ?? 0) + order.subtotal);
  });

  return months.map(({ key, label }) => ({
    label,
    amount: amounts.get(key) ?? 0,
  }));
}

function getTopCategories(orders: Order[]): CategorySummary[] {
  const categories = new Map<string, CategorySummary>();

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const category = getProductBySlug(item.productSlug)?.category ?? "Other";
      const summary = categories.get(category) ?? {
        name: category,
        itemCount: 0,
        revenue: 0,
      };
      summary.itemCount += item.quantity;
      summary.revenue += item.lineTotal;
      categories.set(category, summary);
    });
  });

  return Array.from(categories.values())
    .sort((first, second) => second.revenue - first.revenue)
    .slice(0, 5);
}

function getCustomerCount(orders: Order[]) {
  return new Set(
    orders.map((order) =>
      (order.customer.phone || order.customer.email || order.customer.fullName)
        .trim()
        .toLowerCase(),
    ),
  ).size;
}

export default function AdminDashboard() {
  const orders = useSyncExternalStore(
    subscribeToOrders,
    getOrdersSnapshot,
    getEmptyOrdersSnapshot,
  );
  const { products } = useSyncExternalStore(
    subscribeToAdminProducts,
    getAdminProductsSnapshot,
    getEmptyAdminProductsSnapshot,
  );
  const totalRevenue = orders.reduce((total, order) => total + order.subtotal, 0);
  const monthlyRevenue = getMonthlyRevenue(orders);
  const topCategories = getTopCategories(orders);
  const customerCount = getCustomerCount(orders);

  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <section
        aria-labelledby="dashboard-welcome-title"
        className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        id="overview"
      >
        <div>
          <p className="text-sm font-medium text-primary">Overview</p>
          <h1
            className="mt-1 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
            id="dashboard-welcome-title"
          >
            Welcome to your dashboard
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            A snapshot of products and orders saved in this browser.
          </p>
        </div>
        <p className="text-xs text-text-secondary">
          Order information is browser-local and is not server-synced.
        </p>
      </section>

      <section
        aria-label="Store statistics"
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        <DashboardStatCard
          hint="Sum of saved order subtotals"
          icon={CircleDollarSign}
          label="Revenue"
          value={formatPrice(totalRevenue)}
        />
        <DashboardStatCard
          hint="Orders saved in this browser"
          icon={ShoppingBag}
          label="Orders"
          value={orders.length.toLocaleString("en-BD")}
        />
        <div id="customers">
          <DashboardStatCard
            hint="Unique phone numbers or emails in orders"
            icon={UsersRound}
            label="Customers"
            value={customerCount.toLocaleString("en-BD")}
          />
        </div>
        <DashboardStatCard
          hint="Products in this browser catalog"
          icon={Boxes}
          label="Products"
          value={products.length.toLocaleString("en-BD")}
        />
      </section>

      <div className="grid min-w-0 items-start gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.9fr)]">
        <RevenueChart
          months={monthlyRevenue}
          total={monthlyRevenue.reduce((total, month) => total + month.amount, 0)}
        />
        <TopCategoriesPanel categories={topCategories} />
      </div>

      <RecentOrdersTable orders={orders} />
    </div>
  );
}
