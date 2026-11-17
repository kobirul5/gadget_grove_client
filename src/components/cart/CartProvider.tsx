"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getProductBySlug,
  getProductSlug,
  type Product,
} from "@/components/home/data";

const CART_STORAGE_KEY = "gadget-grove-cart";

export type CartItem = {
  product: Product;
  quantity: number;
};

type StoredCartItem = {
  productSlug: string;
  quantity: number;
};

type CartSnapshot = {
  items: CartItem[];
  storageError: string | null;
  isHydrated: boolean;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  storageError: string | null;
  isHydrated: boolean;
  addItem: (product: Product, quantity: number) => boolean;
  updateQuantity: (productSlug: string, quantity: number) => boolean;
  removeItem: (productSlug: string) => boolean;
};

const emptySnapshot: CartSnapshot = {
  items: [],
  storageError: null,
  isHydrated: false,
};

let snapshot = emptySnapshot;
const listeners = new Set<() => void>();
const CartContext = createContext<CartContextValue | null>(null);

function notify() {
  listeners.forEach((listener) => listener());
}

function updateSnapshot(nextSnapshot: CartSnapshot) {
  snapshot = nextSnapshot;
  notify();
}

function parseCart(value: string | null): CartItem[] {
  if (!value) return [];

  const parsed: unknown = JSON.parse(value);
  if (!Array.isArray(parsed)) {
    throw new Error("Saved cart data is not a list.");
  }

  return parsed.map((item: unknown) => {
    if (
      !item ||
      typeof item !== "object" ||
      !("productSlug" in item) ||
      typeof item.productSlug !== "string" ||
      !("quantity" in item) ||
      typeof item.quantity !== "number" ||
      !Number.isSafeInteger(item.quantity) ||
      item.quantity < 1
    ) {
      throw new Error("Saved cart data contains an invalid item.");
    }

    const product = getProductBySlug(item.productSlug);
    if (!product) {
      throw new Error("Saved cart contains a product that is no longer available.");
    }

    return { product, quantity: item.quantity };
  });
}

function serializeCart(items: CartItem[]) {
  const storedItems: StoredCartItem[] = items.map(({ product, quantity }) => ({
    productSlug: getProductSlug(product),
    quantity,
  }));
  return JSON.stringify(storedItems);
}

function saveItems(items: CartItem[]) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, serializeCart(items));
  } catch (error) {
    console.error("Could not save the shopping cart in this browser.", error);
    updateSnapshot({
      ...snapshot,
      storageError: "Your cart could not be saved in this browser.",
    });
    return false;
  }

  updateSnapshot({
    items,
    storageError: null,
    isHydrated: true,
  });
  return true;
}

function initializeCart() {
  try {
    updateSnapshot({
      items: parseCart(window.localStorage.getItem(CART_STORAGE_KEY)),
      storageError: null,
      isHydrated: true,
    });
  } catch (error) {
    console.error("Could not load the saved shopping cart.", error);
    updateSnapshot({
      ...snapshot,
      storageError: "Your saved cart could not be loaded from this browser.",
      isHydrated: true,
    });
  }
}

function handleStorageChange(event: StorageEvent) {
  if (event.key !== CART_STORAGE_KEY && event.key !== null) return;

  try {
    updateSnapshot({
      items: parseCart(event.newValue),
      storageError: null,
      isHydrated: true,
    });
  } catch (error) {
    console.error("Could not sync the saved shopping cart.", error);
    updateSnapshot({
      ...snapshot,
      storageError: "Your saved cart could not be loaded from this browser.",
    });
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!snapshot.isHydrated) initializeCart();
  window.addEventListener("storage", handleStorageChange);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorageChange);
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return emptySnapshot;
}

function addItem(product: Product, quantity: number) {
  if (!snapshot.isHydrated || !Number.isSafeInteger(quantity) || quantity < 1) {
    updateSnapshot({
      ...snapshot,
      storageError: "Your cart is not ready. Please try again.",
    });
    return false;
  }

  const productSlug = getProductSlug(product);
  const existingItem = snapshot.items.find(
    (item) => getProductSlug(item.product) === productSlug,
  );
  const nextItems = existingItem
    ? snapshot.items.map((item) =>
        getProductSlug(item.product) === productSlug
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      )
    : [...snapshot.items, { product, quantity }];

  if (
    nextItems.some(({ quantity: itemQuantity }) => !Number.isSafeInteger(itemQuantity))
  ) {
    updateSnapshot({
      ...snapshot,
      storageError: "The requested quantity is too large.",
    });
    return false;
  }

  return saveItems(nextItems);
}

function updateQuantity(productSlug: string, quantity: number) {
  if (!snapshot.isHydrated || !Number.isSafeInteger(quantity) || quantity < 1) {
    updateSnapshot({
      ...snapshot,
      storageError: "Choose a valid item quantity.",
    });
    return false;
  }

  if (!snapshot.items.some((item) => getProductSlug(item.product) === productSlug)) {
    return false;
  }

  const nextItems = snapshot.items.map((item) =>
    getProductSlug(item.product) === productSlug ? { ...item, quantity } : item,
  );
  return saveItems(nextItems);
}

function removeItem(productSlug: string) {
  if (!snapshot.isHydrated) {
    updateSnapshot({
      ...snapshot,
      storageError: "Your cart is not ready. Please try again.",
    });
    return false;
  }

  const nextItems = snapshot.items.filter(
    (item) => getProductSlug(item.product) !== productSlug,
  );
  if (nextItems.length === snapshot.items.length) return false;

  return saveItems(nextItems);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  const value = useMemo(
    () => ({
      items: cart.items,
      itemCount,
      storageError: cart.storageError,
      isHydrated: cart.isHydrated,
      addItem,
      updateQuantity,
      removeItem,
    }),
    [cart.items, cart.isHydrated, cart.storageError, itemCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }
  return context;
}
