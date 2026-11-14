"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftRight,
  Check,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { featuredProducts, newTrends } from "@/components/home/data";

const productImages = [
  {
    src: featuredProducts[3].image,
    alt: "HP Pavilion 16 laptop, front view",
  },
  {
    src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85",
    alt: "HP Pavilion laptop, angled view",
  },
  {
    src: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=85",
    alt: "HP Pavilion laptop, side view",
  },
  {
    src: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=85",
    alt: "HP Pavilion laptop keyboard and display",
  },
];

const specificationGroups = [
  {
    title: "Main Features",
    rows: [
      ["Operating System", "Windows 11"],
      ["Model", "HP Pavilion 16-ag0070wm (9W6U4AV) | Silver"],
      ["Memory", "8GB LPDDR5 onboard RAM, 512GB M.2 NVMe SSD"],
      ["Weight", "1.79 kg"],
      ["Storage", "512GB M.2 NVMe PCIe Gen4 SSD"],
      ["Warranty", "1 Year Parts & 2 Years Service Warranty"],
      ["Dimensions", "14.1 × 10 × 0.73 inches"],
    ],
  },
  {
    title: "Processor",
    rows: [
      ["Core", "8"],
      ["Brand", "AMD"],
      ["Cache", "16MB"],
      ["Model", "Ryzen 7 8840U"],
      ["Thread", "16"],
      ["Frequency", "3.3 GHz (Up to 5.1 GHz)"],
    ],
  },
  {
    title: "Storage",
    rows: [
      ["Type", "M.2 NVMe PCIe 4.0 SSD"],
      ["Upgrade", "No"],
      ["Capacity", "512GB"],
      ["Extra Slot", "No"],
    ],
  },
  {
    title: "Memory",
    rows: [
      ["RAM", "8GB onboard"],
      ["Type", "LPDDR5-SDRAM"],
      ["Upgrade", "No"],
      ["Bus Speed", "6400 MHz"],
      ["Maximum RAM", "8GB"],
    ],
  },
  {
    title: "Display",
    rows: [
      ["Size", "16 inches"],
      ["Type", "IPS"],
      ["Resolution", "1920 × 1200"],
      [
        "Display Features",
        "16:10 Aspect Ratio, Micro-edge, Anti-glare, 300 nits peak brightness, 62.5% sRGB",
      ],
      ["Max Refresh Rate", "60Hz"],
    ],
  },
  {
    title: "Graphics Card",
    rows: [
      ["Model", "AMD Radeon 780M"],
      ["Memory Type", "Integrated"],
    ],
  },
  {
    title: "Keyboard and TouchPad",
    rows: [
      ["Type", "Backlit Full-size Keyboard"],
      ["Features", "Numeric keypad"],
      ["TouchPad", "HP Imagepad, Precision Touchpad support"],
    ],
  },
  {
    title: "Camera and Audio",
    rows: [
      ["Webcam", "Full HD"],
      ["Speaker", "Stereo speakers"],
      ["Microphone", "Dual Array Microphones"],
      ["Special Features", "DTS: X Ultra"],
    ],
  },
  {
    title: "Ports and Slots",
    rows: [
      ["HDMI", "1 × HDMI 2.1"],
      ["USB Port", "1 × USB Type-A 10Gbps, 1 × USB Type-A 5Gbps"],
      ["PD Charging", "Yes"],
      ["Display Port", "DisplayPort 1.4a"],
      ["Headphone Microphone", "1 × headphone/microphone combo"],
      ["USB Type-C/Thunderbolt", "2 × USB Type-C 10Gbps"],
    ],
  },
  {
    title: "Network and Connectivity",
    rows: [
      ["Wi-Fi", "Wi-Fi 6 (802.11ax)"],
      ["Bluetooth", "Bluetooth 5.3"],
    ],
  },
  {
    title: "Battery",
    rows: [
      ["Type", "3-cell, Li-ion polymer"],
      ["Adapter", "65W USB Type-C Power Adapter"],
      ["Capacity", "59 Wh"],
      ["Battery Life", "Up to 12 hours and 30 minutes"],
    ],
  },
];

const relatedProducts = [
  {
    name: "Galaxy S Series",
    price: "৳ 89,900",
    image: newTrends[2].image,
  },
  {
    name: "Studio Wireless Headphones",
    price: "৳ 18,900",
    image: newTrends[3].image,
  },
  {
    name: "Classic Smart Watch",
    price: "৳ 14,500",
    image: newTrends[4].image,
  },
];

const tabs = ["Specification", "Description", "Warranty"] as const;
type ProductTab = (typeof tabs)[number];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<ProductTab>("Specification");
  const [quantity, setQuantity] = useState(1);
  const [isCompared, setIsCompared] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  function addToCart() {
    setCartQuantity((currentQuantity) => currentQuantity + quantity);
  }

  return (
    <main className="flex-1 bg-background-soft">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-text-secondary">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link className="hover:text-primary" href="/">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="hover:text-primary" href="/#popular-categories">
                Computers
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-text-primary">
              HP Pavilion 16
            </li>
          </ol>
        </nav>

        <section
          aria-labelledby="product-title"
          className="grid gap-8 rounded-2xl border border-border/70 bg-surface p-4 shadow-sm shadow-primary/5 sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8"
        >
          <div className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-secondary">
              <Image
                alt={productImages[selectedImage].alt}
                className="object-contain p-5 sm:p-8"
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 50vw"
                src={productImages[selectedImage].src}
                unoptimized
              />
              <span className="absolute bottom-3 right-3 rounded-full border border-border bg-surface/90 px-3 py-1 text-xs text-text-secondary">
                {selectedImage + 1} / {productImages.length}
              </span>
            </div>
            <div
              aria-label="Product images"
              className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-3"
            >
              {productImages.map((image, index) => (
                <button
                  aria-label={`Show product image ${index + 1}`}
                  aria-pressed={selectedImage === index}
                  className={`relative aspect-square overflow-hidden rounded-lg border bg-surface p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                  key={image.src}
                  onClick={() => setSelectedImage(index)}
                  type="button"
                >
                  <Image
                    alt=""
                    className="object-contain"
                    fill
                    sizes="(max-width: 640px) 22vw, 100px"
                    src={image.src}
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                <Check aria-hidden="true" className="size-3.5" />
                In stock
              </span>
              <button
                aria-pressed={isCompared}
                className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border px-3 text-xs font-medium text-text-primary transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={() => setIsCompared((current) => !current)}
                type="button"
              >
                <ArrowLeftRight aria-hidden="true" className="size-4" />
                {isCompared ? "Added to Compare" : "Add to Compare"}
              </button>
            </div>

            <p className="text-xs font-medium tracking-wide text-primary uppercase">
              HP · Pavilion Series
            </p>
            <h1
              className="mt-2 text-2xl leading-tight font-semibold tracking-tight text-text-primary sm:text-3xl"
              id="product-title"
            >
              HP Pavilion 16 Ryzen 7 8GB RAM 512GB SSD 16&quot; Laptop
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-2xl font-bold text-primary">৳79,999</span>
              <span className="text-sm text-text-secondary line-through">
                ৳89,999
              </span>
              <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                Save ৳10,000
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-text-secondary">
              <span aria-label="Rated 4.8 out of 5" className="flex text-warning">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    aria-hidden="true"
                    className={`size-4 ${index < 4 ? "fill-current" : ""}`}
                    key={index}
                  />
                ))}
              </span>
              <span>4.8</span>
              <span aria-hidden="true">·</span>
              <a className="hover:text-primary" href="#product-reviews">
                24 reviews
              </a>
            </div>

            <ul className="mt-6 space-y-3 border-y border-border py-5 text-sm text-text-secondary">
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                Processor: AMD Ryzen 7 8840U, up to 5.1 GHz
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                Graphics: Integrated AMD Radeon 780M
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                Memory: 8GB LPDDR5 onboard RAM, 512GB M.2 NVMe SSD
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                Display: 16&quot; WUXGA IPS, 300 nits, anti-glare
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                Warranty: 1 year parts and 2 years service
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-text-primary">
                Quantity
              </span>
              <div className="inline-flex h-10 items-center rounded-lg border border-border bg-surface">
                <button
                  aria-label="Decrease quantity"
                  className="grid size-10 place-items-center text-text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-40"
                  disabled={quantity === 1}
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  type="button"
                >
                  <Minus aria-hidden="true" className="size-3.5" />
                </button>
                <output
                  aria-label="Quantity"
                  className="min-w-8 text-center text-sm font-medium text-text-primary"
                >
                  {quantity}
                </output>
                <button
                  aria-label="Increase quantity"
                  className="grid size-10 place-items-center text-text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                  onClick={() => setQuantity((value) => value + 1)}
                  type="button"
                >
                  <Plus aria-hidden="true" className="size-3.5" />
                </button>
              </div>
              <span className="text-xs text-text-secondary">
                {cartQuantity > 0
                  ? `${cartQuantity} ${cartQuantity === 1 ? "item" : "items"} added`
                  : "Available for delivery"}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Button
                className="h-11 bg-primary text-primary-foreground hover:bg-primary-hover"
                onClick={addToCart}
                type="button"
              >
                Buy Now
              </Button>
              <Button
                className="h-11 gap-2 border-primary text-primary hover:bg-primary/10"
                onClick={addToCart}
                type="button"
                variant="outline"
              >
                <ShoppingCart aria-hidden="true" className="size-4" />
                Add to Cart
              </Button>
            </div>
            <p aria-live="polite" className="sr-only">
              {cartQuantity > 0
                ? `${cartQuantity} ${cartQuantity === 1 ? "item" : "items"} added to cart`
                : ""}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
              <div className="flex flex-col items-center gap-2 text-center text-[11px] text-text-secondary sm:flex-row sm:text-left">
                <Truck aria-hidden="true" className="size-5 shrink-0 text-primary" />
                <span>Careful delivery</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center text-[11px] text-text-secondary sm:flex-row sm:text-left">
                <ShieldCheck aria-hidden="true" className="size-5 shrink-0 text-primary" />
                <span>Genuine product</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center text-[11px] text-text-secondary sm:flex-row sm:text-left">
                <Heart aria-hidden="true" className="size-5 shrink-0 text-primary" />
                <span>Warranty included</span>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="Product information"
          className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10"
        >
          <div className="min-w-0">
            <div
              aria-label="Product information sections"
              className="flex gap-2 overflow-x-auto pb-1"
              role="tablist"
            >
              {tabs.map((tab) => (
                <button
                  aria-selected={activeTab === tab}
                  className={`min-h-10 shrink-0 rounded-full border px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    activeTab === tab
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface text-text-secondary hover:border-primary hover:text-primary"
                  }`}
                  id={`product-tab-${tab.toLowerCase()}`}
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>

            <div
              aria-labelledby={`product-tab-${activeTab.toLowerCase()}`}
              className="mt-5 rounded-xl border border-border/70 bg-surface p-4 sm:p-6"
              id="product-information-panel"
              role="tabpanel"
            >
              {activeTab === "Specification" ? (
                <div className="space-y-2">
                  {specificationGroups.map((group, index) => (
                    <details
                      className="group border-b border-border last:border-b-0"
                      key={group.title}
                      open={index === 0}
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-sm font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                        {group.title}
                        <ChevronDown
                          aria-hidden="true"
                          className="size-4 shrink-0 text-text-secondary transition-transform group-open:rotate-180"
                        />
                      </summary>
                      <dl className="pb-3">
                        {group.rows.map(([label, value]) => (
                          <div
                            className="grid grid-cols-[minmax(110px,0.8fr)_minmax(0,1.2fr)] gap-4 border-b border-border/70 py-2.5 text-xs last:border-b-0 sm:text-sm"
                            key={label}
                          >
                            <dt className="text-text-secondary">{label}</dt>
                            <dd className="text-text-primary">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </details>
                  ))}
                </div>
              ) : null}

              {activeTab === "Description" ? (
                <div className="space-y-4 text-sm leading-7 text-text-secondary">
                  <h2 className="text-lg font-semibold text-text-primary">
                    A little more room for everything
                  </h2>
                  <p>
                    The HP Pavilion 16 brings a roomy 16-inch display and an
                    AMD Ryzen 7 processor together in a slim everyday laptop.
                    Its WUXGA screen, integrated Radeon graphics, and 8GB of
                    onboard memory make it a thoughtful fit for work, study,
                    and downtime.
                  </p>
                  <p>
                    Store documents, projects, and everyday essentials on the
                    512GB NVMe SSD. The backlit keyboard, precision touchpad,
                    and USB-C connectivity keep the details practical from
                    morning to evening.
                  </p>
                </div>
              ) : null}

              {activeTab === "Warranty" ? (
                <div className="space-y-4 text-sm leading-7 text-text-secondary">
                  <h2 className="text-lg font-semibold text-text-primary">
                    Warranty information
                  </h2>
                  <p>
                    This listing includes 1 year of parts warranty and 2 years
                    of service warranty.
                  </p>
                  <p>
                    Keep your proof of purchase and contact the store for
                    warranty service details.
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <aside className="space-y-6">
            <ProductSideList
              heading="Related Products"
              products={relatedProducts}
            />
            <ProductSideList
              heading="Recently Viewed Products"
              products={relatedProducts}
              showAvailability
            />
          </aside>
        </section>

        <div className="sr-only" id="product-reviews">
          Customer reviews for the HP Pavilion 16.
        </div>
      </div>
    </main>
  );
}

function ProductSideList({
  heading,
  products,
  showAvailability = false,
}: {
  heading: string;
  products: { name: string; price: string; image: string }[];
  showAvailability?: boolean;
}) {
  return (
    <section
      aria-label={heading}
      className="rounded-xl border border-border/70 bg-surface p-4"
    >
      <h2 className="text-base font-semibold text-text-primary">{heading}</h2>
      <ul className="mt-3 space-y-2">
        {products.map((product) => (
          <li
            className="flex items-center gap-3 rounded-lg border border-border/70 p-2.5"
            key={product.name}
          >
            <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-surface-secondary">
              <Image
                alt=""
                className="object-contain p-1"
                fill
                sizes="48px"
                src={product.image}
                unoptimized
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-text-primary">
                {product.name}
              </p>
              <p className="mt-1 text-xs font-semibold text-primary">
                {product.price}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border px-2 py-1 text-[10px] text-text-secondary">
              {showAvailability ? (
                <>
                  <Check aria-hidden="true" className="size-3 text-success" />
                  Available
                </>
              ) : (
                "Free delivery"
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
