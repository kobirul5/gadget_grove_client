"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const categories = [
  {
    label: "Apple",
    columns: [
      ["iPhone", "iPad", "MacBook", "MacBook Air", "Air M5 Series"],
      ["Air M4 Series", "Air M3 Series", "Air M2 Series", "MacBook Pro", "Pro M5 Series"],
      ["Pro M4 Series", "Pro M3 Series", "Pro M2 Series", "MacBook Cover", "Screen Protector"],
      ["Mac mini", "M4", "M2", "Power Adapter", "Universal Travel Adapter"],
      ["AirPods", "EarPods", "Apple Watch", "AirTag", "iMac"],
      ["M4 Series", "M3 Series", "M1 Series", "Mac Studio", "AirPods Max"],
    ],
  },
  {
    label: "Tablet & Accessories",
    columns: [
      ["iPad", "Android Tablets"],
      ["Cases & Covers", "Screen Protectors"],
      ["Keyboards", "Stylus Pens"],
    ],
  },
  {
    label: "Phones",
    columns: [
      ["iPhone", "Samsung"],
      ["Xiaomi", "OnePlus"],
      ["Phone Accessories", "Cases & Covers"],
    ],
  },
  {
    label: "Desktop",
    columns: [
      ["Desktop PCs", "All-in-One PCs"],
      ["Monitors", "Keyboards & Mouse"],
    ],
  },
  {
    label: "Laptops",
    columns: [
      ["MacBook", "Windows Laptops"],
      ["Gaming Laptops", "Laptop Accessories"],
    ],
  },
  {
    label: "Gadgets & Accessories",
    columns: [
      ["Headphones", "Smartwatches"],
      ["Speakers", "Power Banks"],
      ["Chargers & Cables", "Smart Home"],
    ],
  },
  {
    label: "Appliances",
    columns: [
      ["Air Conditioners", "Refrigerators"],
      ["Washing Machines", "Air Purifiers"],
      ["Kitchen Appliances"],
    ],
  },
  {
    label: "Lifestyle",
    columns: [
      ["Wearables", "Gaming"],
      ["Travel", "Smart Home"],
      ["Personal Care"],
    ],
  },
  {
    label: "Camera & Networking",
    columns: [
      ["Digital Cameras", "Action Cameras"],
      ["Wi-Fi Routers", "Mesh Wi-Fi"],
      ["CCTV Cameras"],
    ],
  },
];

export default function CategoryNavigation() {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !navigationRef.current?.contains(event.target)
      ) {
        setOpenCategory(null);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, []);

  return (
    <nav
      aria-label="Product categories"
      className="relative border-t border-border"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpenCategory(null);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && openCategory !== null) {
          triggerRefs.current[openCategory]?.focus();
          setOpenCategory(null);
        }
      }}
      onMouseLeave={(event) => {
        if (!event.currentTarget.contains(document.activeElement)) {
          setOpenCategory(null);
        }
      }}
      ref={navigationRef}
    >
      <ul className="mx-auto flex min-h-11 max-w-7xl items-center gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:gap-2 sm:px-6 lg:justify-between lg:gap-1 lg:px-8">
        {categories.map((category, index) => {
          const isOpen = openCategory === index;

          return (
            <li className="shrink-0" key={category.label}>
              <button
                aria-controls="category-mega-menu"
                aria-expanded={isOpen}
                className={`inline-flex min-h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-3 ${
                  isOpen
                    ? "bg-primary/10 text-primary"
                    : "text-text-primary hover:bg-primary/5 hover:text-primary"
                }`}
                onClick={() => setOpenCategory(index)}
                onFocus={() => setOpenCategory(index)}
                onMouseEnter={() => setOpenCategory(index)}
                ref={(element) => {
                  triggerRefs.current[index] = element;
                }}
                type="button"
              >
                {category.label}
                <ChevronDown
                  aria-hidden="true"
                  className={`size-3.5 shrink-0 text-text-secondary transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>

      {openCategory !== null ? (
        <div
          className="absolute inset-x-0 top-full z-50 border-y border-border bg-surface shadow-lg shadow-primary/10"
          id="category-mega-menu"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-x-6 py-4 sm:grid-cols-2 lg:grid-cols-6">
              {categories[openCategory].columns.map((column, columnIndex) => (
                <ul
                  aria-label={`${categories[openCategory].label} options ${columnIndex + 1}`}
                  className="min-w-0"
                  key={`${openCategory}-${columnIndex}`}
                >
                  {column.map((option) => (
                    <li key={option}>
                      <Link
                        className="flex min-h-10 items-center border-b border-border px-1 text-[13px] font-medium text-text-primary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                        href="/#popular-categories"
                        onClick={() => setOpenCategory(null)}
                      >
                        {option}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>

            <div className="flex min-h-11 items-center justify-between gap-4 border-t border-border py-2 text-xs">
              <p className="text-text-secondary">
                Showing all items under{" "}
                <span className="font-semibold text-text-primary">
                  {categories[openCategory].label}
                </span>
              </p>
              <Link
                className="inline-flex shrink-0 items-center gap-1 font-semibold text-primary transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-primary"
                href="/#popular-categories"
                onClick={() => setOpenCategory(null)}
              >
                View All {categories[openCategory].label}
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
