import {
  allProducts,
  getProductSlug,
  type Product,
} from "@/components/home/data";

const STORAGE_KEY = "gadget-grove-admin-products";

export type AdminProduct = {
  id: string;
  sku: string;
  product: Product;
  stock: number;
  threshold: number;
  sold: number;
  online: boolean;
  alertsRead: boolean;
};

type AdminProductsSnapshot = {
  products: AdminProduct[];
  storageError: string | null;
  isHydrated: boolean;
};

type NewAdminProduct = Omit<
  AdminProduct,
  "id" | "sku" | "sold" | "alertsRead"
>;

const seedStock = [34, 12, 0, 55, 89];
const listeners = new Set<() => void>();

function createSeedProducts(): AdminProduct[] {
  return allProducts.map((product, index) => {
    const slug = getProductSlug(product);

    return {
      id: slug,
      sku: `GG-${slug.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8)}-${String(index + 1).padStart(2, "0")}`,
      product,
      stock: seedStock[index % seedStock.length],
      threshold: 15,
      sold: 0,
      online: true,
      alertsRead: false,
    };
  });
}

const serverSnapshot: AdminProductsSnapshot = {
  products: createSeedProducts(),
  storageError: null,
  isHydrated: false,
};
let snapshot = serverSnapshot;

function isAdminProduct(value: unknown): value is AdminProduct {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<AdminProduct>;
  const product = item.product;

  return (
    typeof item.id === "string" &&
    typeof item.sku === "string" &&
    typeof product === "object" &&
    product !== null &&
    typeof product.name === "string" &&
    typeof product.category === "string" &&
    typeof product.price === "string" &&
    typeof product.image === "string" &&
    typeof item.stock === "number" &&
    Number.isSafeInteger(item.stock) &&
    item.stock >= 0 &&
    typeof item.threshold === "number" &&
    Number.isSafeInteger(item.threshold) &&
    item.threshold >= 0 &&
    typeof item.sold === "number" &&
    Number.isSafeInteger(item.sold) &&
    item.sold >= 0 &&
    typeof item.online === "boolean" &&
    typeof item.alertsRead === "boolean"
  );
}

function notify() {
  listeners.forEach((listener) => listener());
}

function setSnapshot(next: AdminProductsSnapshot) {
  snapshot = next;
  notify();
}

function loadProducts() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      setSnapshot({
        products: createSeedProducts(),
        storageError: null,
        isHydrated: true,
      });
      return;
    }

    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every(isAdminProduct)) {
      throw new Error("Saved admin product data has an invalid shape.");
    }

    setSnapshot({
      products: parsed,
      storageError: null,
      isHydrated: true,
    });
  } catch (error) {
    console.error("Could not load admin products from this browser.", error);
    setSnapshot({
      ...snapshot,
      storageError:
        "Saved product data could not be loaded. Your browser may have unavailable or invalid data.",
      isHydrated: true,
    });
  }
}

function saveProducts(products: AdminProduct[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Could not save admin products in this browser.", error);
    setSnapshot({
      ...snapshot,
      storageError: "Product changes could not be saved in this browser.",
      isHydrated: true,
    });
    return false;
  }

  setSnapshot({ products, storageError: null, isHydrated: true });
  return true;
}

function handleStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY && event.key !== null) return;
  loadProducts();
}

export function subscribeToAdminProducts(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", handleStorage);
  if (!snapshot.isHydrated) loadProducts();

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function getAdminProductsSnapshot() {
  return snapshot;
}

export function getEmptyAdminProductsSnapshot() {
  return serverSnapshot;
}

export function addAdminProduct(product: NewAdminProduct) {
  const id = getProductSlug(product.product);
  if (snapshot.products.some((item) => item.id === id)) {
    return { saved: false, reason: "A product with this name already exists." };
  }

  const skuBase = id.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
  const nextProduct: AdminProduct = {
    ...product,
    id,
    sku: `GG-${skuBase}-${String(snapshot.products.length + 1).padStart(2, "0")}`,
    sold: 0,
    alertsRead: false,
  };
  return saveProducts([nextProduct, ...snapshot.products])
    ? { saved: true as const }
    : { saved: false as const, reason: snapshot.storageError };
}

export function updateAdminProduct(
  id: string,
  update: (product: AdminProduct) => AdminProduct,
) {
  const existing = snapshot.products.find((product) => product.id === id);
  if (!existing) return false;

  return saveProducts(
    snapshot.products.map((product) =>
      product.id === id ? update(product) : product,
    ),
  );
}

export function removeAdminProduct(id: string) {
  if (!snapshot.products.some((product) => product.id === id)) return false;
  return saveProducts(snapshot.products.filter((product) => product.id !== id));
}

export function adjustAdminStock(id: string, stock: number) {
  if (!Number.isSafeInteger(stock) || stock < 0) return false;

  return updateAdminProduct(id, (product) => ({
    ...product,
    stock,
    alertsRead: false,
  }));
}

export function markStockAlertsRead() {
  const products = snapshot.products.map((product) => ({
    ...product,
    alertsRead: true,
  }));
  return saveProducts(products);
}

export function getAdminProductStatus(
  product: Pick<AdminProduct, "stock" | "threshold">,
) {
  if (product.stock === 0) return "Out of stock";
  if (product.stock <= product.threshold) return "Low stock";
  return "In stock";
}
