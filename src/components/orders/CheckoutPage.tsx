"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { getProductBySlug, getProductSlug } from "@/components/home/data";
import { useCart } from "@/components/cart/CartProvider";
import {
  createOrder,
  formatPrice,
  getPriceAmount,
  type OrderCustomer,
  type Order,
} from "@/components/orders/orders";

const initialCustomer: OrderCustomer = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
};

const fieldClassName =
  "mt-1.5 min-h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const {
    items: cartItems,
    isHydrated,
    storageError,
    clearCart,
  } = useCart();
  const [customer, setCustomer] = useState(initialCustomer);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [cartClearFailed, setCartClearFailed] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const successDialogRef = useRef<HTMLDialogElement>(null);

  const directSlug = searchParams.get("product");
  const isDirectOrder = directSlug !== null;
  const directProduct = directSlug ? getProductBySlug(directSlug) : undefined;
  const quantityValue = searchParams.get("quantity");
  const directQuantity =
    quantityValue && /^\d+$/.test(quantityValue) ? Number(quantityValue) : 0;
  const directOrderIsValid =
    !isDirectOrder ||
    (Boolean(directProduct) &&
      Number.isSafeInteger(directQuantity) &&
      directQuantity > 0);
  const orderItems =
    isDirectOrder && directProduct && directOrderIsValid
      ? [{ product: directProduct, quantity: directQuantity }]
      : isDirectOrder
        ? []
        : cartItems;
  const itemCount = orderItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subtotal = orderItems.reduce(
    (total, { product, quantity }) =>
      total + getPriceAmount(product.price) * quantity,
    0,
  );
  const isReady = isDirectOrder || isHydrated;

  useEffect(() => {
    const dialog = successDialogRef.current;
    if (placedOrder && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [placedOrder]);

  function updateCustomer(field: keyof OrderCustomer, value: string) {
    setCustomer((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isReady || !directOrderIsValid || orderItems.length === 0) return;

    setFormError("");
    setIsSubmitting(true);

    try {
      const order = createOrder(
        orderItems,
        {
          fullName: customer.fullName.trim(),
          phone: customer.phone.trim(),
          email: customer.email.trim(),
          address: customer.address.trim(),
          city: customer.city.trim(),
        },
      );
      setCartClearFailed(!isDirectOrder && !clearCart());
      setIsSuccessDialogOpen(true);
      setPlacedOrder(order);
    } catch (error) {
      console.error("Could not place the order.", error);
      setFormError(
        error instanceof Error
          ? error.message
          : "Your order could not be placed. Please try again.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex-1 bg-background-soft">
      {placedOrder && !isSuccessDialogOpen ? (
        <div
          className="mx-auto mt-6 flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
          role="status"
        >
          <p className="text-sm font-medium text-success">
            Your order was placed successfully.
          </p>
          <Link
            className="text-sm font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            href={`/order-confirmation?${new URLSearchParams({
              orderId: placedOrder.id,
              ...(cartClearFailed ? { cartClear: "failed" } : {}),
            }).toString()}`}
          >
            View order details
          </Link>
        </div>
      ) : null}
      <dialog
        aria-labelledby="order-success-title"
        aria-describedby="order-success-description"
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-border bg-surface p-0 text-text-primary shadow-xl backdrop:bg-black/50"
        onClose={() => setIsSuccessDialogOpen(false)}
        ref={successDialogRef}
      >
        {placedOrder ? (
          <div className="p-6 text-center sm:p-8">
            <CheckCircle2
              aria-hidden="true"
              className="mx-auto size-14 text-success"
              strokeWidth={1.75}
            />
            <p className="mt-4 text-sm font-semibold text-success">
              Order placed
            </p>
            <h2
              className="mt-1 text-2xl font-bold tracking-tight text-text-primary"
              id="order-success-title"
            >
              Order successful!
            </h2>
            <p
              className="mt-2 text-sm leading-6 text-text-secondary"
              id="order-success-description"
            >
              Thank you, {placedOrder.customer.fullName}. Your order reference
              is{" "}
              <span className="font-semibold text-text-primary">
                {placedOrder.id.slice(0, 8).toUpperCase()}
              </span>
              .
            </p>
            <p className="mt-4 rounded-lg bg-background-soft px-4 py-3 text-xs leading-5 text-text-secondary">
              Your demo order is saved in this browser only and has not been
              sent to the store.
            </p>
            {cartClearFailed ? (
              <p className="mt-3 text-xs text-warning" role="alert">
                The order was saved, but your cart could not be cleared.
              </p>
            ) : null}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                href={`/order-confirmation?${new URLSearchParams({
                  orderId: placedOrder.id,
                  ...(cartClearFailed ? { cartClear: "failed" } : {}),
                }).toString()}`}
              >
                View order details
              </Link>
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-text-primary transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={() => {
                  setIsSuccessDialogOpen(false);
                  successDialogRef.current?.close();
                }}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-text-secondary">
          <ol className="flex items-center gap-2">
            <li>
              <Link className="hover:text-primary" href="/">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="hover:text-primary" href="/cart">
                Cart
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-text-primary">
              Checkout
            </li>
          </ol>
        </nav>

        <div className="mb-7">
          <p className="text-sm font-medium text-primary">Almost yours</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your contact and delivery details to place your order.
          </p>
        </div>

        {storageError && !isDirectOrder ? (
          <p
            className="mb-5 rounded-lg border border-error/30 bg-surface px-4 py-3 text-sm text-error"
            role="alert"
          >
            {storageError}
          </p>
        ) : null}

        {!isReady ? (
          <div
            className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-text-secondary"
            role="status"
          >
            Loading your cart...
          </div>
        ) : !directOrderIsValid ? (
          <section className="rounded-2xl border border-border bg-surface px-5 py-12 text-center sm:px-8">
            <h2 className="text-lg font-semibold text-text-primary">
              This product order is not available
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Choose a product and quantity before continuing to checkout.
            </p>
            <Link
              className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              href="/products"
            >
              Browse products
            </Link>
          </section>
        ) : orderItems.length === 0 ? (
          <section className="rounded-2xl border border-border bg-surface px-5 py-12 text-center sm:px-8">
            <h2 className="text-lg font-semibold text-text-primary">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Add a product to your cart or choose Buy Now on a product page.
            </p>
            <Link
              className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              href="/products"
            >
              Browse products
            </Link>
          </section>
        ) : (
          <form
            className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"
            onSubmit={handleSubmit}
          >
            <div className="space-y-6">
              <section className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
                <h2 className="text-lg font-semibold text-text-primary">
                  Contact and delivery
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-text-primary">
                    Full name <span aria-hidden="true" className="text-error">*</span>
                    <input
                      autoComplete="name"
                      className={fieldClassName}
                      maxLength={100}
                      name="fullName"
                      onChange={(event) =>
                        updateCustomer("fullName", event.target.value)
                      }
                      required
                      value={customer.fullName}
                    />
                  </label>
                  <label className="text-sm font-medium text-text-primary">
                    Phone number <span aria-hidden="true" className="text-error">*</span>
                    <input
                      autoComplete="tel"
                      className={fieldClassName}
                      maxLength={30}
                      name="phone"
                      onChange={(event) =>
                        updateCustomer("phone", event.target.value)
                      }
                      required
                      type="tel"
                      value={customer.phone}
                    />
                  </label>
                  <label className="text-sm font-medium text-text-primary sm:col-span-2">
                    Email address <span className="font-normal text-text-secondary">(optional)</span>
                    <input
                      autoComplete="email"
                      className={fieldClassName}
                      maxLength={254}
                      name="email"
                      onChange={(event) =>
                        updateCustomer("email", event.target.value)
                      }
                      type="email"
                      value={customer.email}
                    />
                  </label>
                  <label className="text-sm font-medium text-text-primary sm:col-span-2">
                    Delivery address <span aria-hidden="true" className="text-error">*</span>
                    <textarea
                      autoComplete="street-address"
                      className={`${fieldClassName} min-h-24 resize-y py-3`}
                      maxLength={500}
                      name="address"
                      onChange={(event) =>
                        updateCustomer("address", event.target.value)
                      }
                      required
                      value={customer.address}
                    />
                  </label>
                  <label className="text-sm font-medium text-text-primary sm:col-span-2">
                    City / area <span aria-hidden="true" className="text-error">*</span>
                    <input
                      autoComplete="address-level2"
                      className={fieldClassName}
                      maxLength={100}
                      name="city"
                      onChange={(event) =>
                        updateCustomer("city", event.target.value)
                      }
                      required
                      value={customer.city}
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
                <h2 className="text-lg font-semibold text-text-primary">
                  Payment method
                </h2>
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-primary bg-background-soft p-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border border-primary"
                  >
                    <span className="size-2 rounded-full bg-primary" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-text-primary">
                      Cash on delivery
                    </span>
                    <span className="mt-1 block text-xs text-text-secondary">
                      Pay when your order is delivered.
                    </span>
                  </span>
                </div>
              </section>
            </div>

            <aside className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-text-primary">
                Order summary
              </h2>
              <ul className="mt-4 max-h-80 divide-y divide-border overflow-y-auto">
                {orderItems.map(({ product, quantity }) => {
                  const productSlug = getProductSlug(product);

                  return (
                    <li
                      className="flex gap-3 py-3 first:pt-0"
                      key={productSlug}
                    >
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-surface-secondary">
                        <Image
                          alt=""
                          className="object-contain p-1"
                          fill
                          sizes="64px"
                          src={product.image}
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium text-text-primary">
                          {product.name}
                        </p>
                        <p className="mt-1 text-xs text-text-secondary">
                          Qty: {quantity}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-semibold text-text-primary">
                        {formatPrice(getPriceAmount(product.price) * quantity)}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-2 flex items-center justify-between border-t border-border pt-4 text-sm">
                <span className="text-text-secondary">
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
                <span className="font-semibold text-text-primary">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-3 text-xs leading-5 text-text-secondary">
                Delivery fee will be confirmed by the store. No online payment is
                collected in this checkout.
              </p>
              {formError ? (
                <p className="mt-4 text-sm text-error" role="alert">
                  {formError}
                </p>
              ) : null}
              <button
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting || placedOrder !== null}
                type="submit"
              >
                {isSubmitting ? "Placing order..." : "Place order"}
              </button>
              <p className="mt-3 text-center text-xs text-text-secondary">
                Your order details are saved in this browser only.
              </p>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}
