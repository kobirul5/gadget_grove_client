import { getProductSlug } from "@/components/home/data";
import type { CartItem } from "@/components/cart/CartProvider";

const ORDER_STORAGE_PREFIX = "gadget-grove-order-";

export type OrderCustomer = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
};

export type OrderItem = {
  productSlug: string;
  name: string;
  quantity: number;
  unitPrice: string;
  lineTotal: number;
};

export type Order = {
  id: string;
  createdAt: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  paymentMethod: "Cash on delivery";
};

export function getPriceAmount(price: string) {
  const amount = Number(price.replace(/[^\d]/g, ""));
  return Number.isSafeInteger(amount) ? amount : 0;
}

export function formatPrice(amount: number) {
  return `৳ ${amount.toLocaleString("en-BD")}`;
}

function isOrder(value: unknown, orderId: string): value is Order {
  if (!value || typeof value !== "object") return false;

  const order = value as Partial<Order>;
  return (
    order.id === orderId &&
    typeof order.createdAt === "string" &&
    typeof order.subtotal === "number" &&
    Number.isSafeInteger(order.subtotal) &&
    order.paymentMethod === "Cash on delivery" &&
    Boolean(order.customer) &&
    typeof order.customer?.fullName === "string" &&
    typeof order.customer.phone === "string" &&
    typeof order.customer.email === "string" &&
    typeof order.customer.address === "string" &&
    typeof order.customer.city === "string" &&
    Array.isArray(order.items) &&
    order.items.every(
      (item) =>
        Boolean(item) &&
        typeof item.productSlug === "string" &&
        typeof item.name === "string" &&
        Number.isSafeInteger(item.quantity) &&
        item.quantity > 0 &&
        typeof item.unitPrice === "string" &&
        Number.isSafeInteger(item.lineTotal) &&
        item.lineTotal >= 0,
    )
  );
}

export function createOrder(items: CartItem[], customer: OrderCustomer) {
  if (items.length === 0) {
    throw new Error("Your cart is empty. Add a product before placing an order.");
  }

  const orderItems: OrderItem[] = items.map(({ product, quantity }) => {
    const unitPriceAmount = getPriceAmount(product.price);
    const lineTotal = unitPriceAmount * quantity;

    if (
      !Number.isSafeInteger(quantity) ||
      quantity < 1 ||
      !Number.isSafeInteger(lineTotal)
    ) {
      throw new Error("An item quantity or price is invalid. Review your order.");
    }

    return {
      productSlug: getProductSlug(product),
      name: product.name,
      quantity,
      unitPrice: product.price,
      lineTotal,
    };
  });
  const subtotal = orderItems.reduce((total, item) => total + item.lineTotal, 0);

  if (!Number.isSafeInteger(subtotal)) {
    throw new Error("Your order total is too large to process.");
  }

  const order: Order = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    customer,
    items: orderItems,
    subtotal,
    paymentMethod: "Cash on delivery",
  };

  try {
    window.localStorage.setItem(
      `${ORDER_STORAGE_PREFIX}${order.id}`,
      JSON.stringify(order),
    );
  } catch (error) {
    console.error("Could not save the order in this browser.", error);
    throw new Error(
      "Your order could not be saved in this browser. Please try again.",
    );
  }

  return order;
}

export function readOrder(orderId: string) {
  try {
    const value = window.localStorage.getItem(
      `${ORDER_STORAGE_PREFIX}${orderId}`,
    );
    if (!value) return null;

    const parsed: unknown = JSON.parse(value);
    if (!isOrder(parsed, orderId)) {
      throw new Error("Saved order data is invalid.");
    }

    return parsed;
  } catch (error) {
    console.error("Could not load the saved order from this browser.", error);
    return null;
  }
}
