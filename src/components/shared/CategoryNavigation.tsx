"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const categories = [
  {
    label: "Apple",
    options: ["iPhone", "iPad", "MacBook", "Apple Watch", "AirPods"],
  },
  {
    label: "Tablet & Accessories",
    options: [
      "Tablets",
      "Cases & Covers",
      "Keyboards",
      "Stylus Pens",
      "Screen Protectors",
    ],
  },
  {
    label: "Phones",
    options: ["iPhone", "Samsung", "Xiaomi", "OnePlus", "Phone Accessories"],
  },
  {
    label: "Desktop",
    options: ["Desktop PCs", "All-in-One PCs", "Monitors", "Keyboards & Mouse"],
  },
  {
    label: "Laptops",
    options: [
      "MacBook",
      "Windows Laptops",
      "Gaming Laptops",
      "Laptop Accessories",
    ],
  },
  {
    label: "Gadgets & Accessories",
    options: [
      "Headphones",
      "Smartwatches",
      "Speakers",
      "Chargers & Cables",
      "Power Banks",
    ],
  },
  {
    label: "Appliances",
    options: [
      "Air Conditioners",
      "Refrigerators",
      "Washing Machines",
      "Air Purifiers",
      "Kitchen Appliances",
    ],
  },
  {
    label: "Lifestyle",
    options: ["Wearables", "Gaming", "Travel", "Smart Home", "Personal Care"],
  },
  {
    label: "Camera & Networking",
    options: [
      "Digital Cameras",
      "Action Cameras",
      "Wi-Fi Routers",
      "Mesh Wi-Fi",
      "CCTV Cameras",
    ],
  },
];

export default function CategoryNavigation() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const navigationRef = useRef<HTMLElement>(null);

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
      className="border-t border-border"
      ref={navigationRef}
    >
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 px-4 sm:gap-x-7 sm:px-6 lg:flex-nowrap lg:justify-between lg:gap-x-3 lg:px-8">
        {categories.map((category, index) => {
          const isOpen = openCategory === category.label;

          return (
            <li
              className="relative shrink-0"
              key={category.label}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setOpenCategory(null);
                }
              }}
              onFocus={() => setOpenCategory(category.label)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setOpenCategory(null);
                  event.currentTarget.querySelector("button")?.focus();
                }
              }}
              onMouseEnter={() => setOpenCategory(category.label)}
              onMouseLeave={(event) => {
                if (!event.currentTarget.contains(document.activeElement)) {
                  setOpenCategory(null);
                }
              }}
            >
              <button
                aria-controls={`category-menu-${index}`}
                aria-expanded={isOpen}
                className="inline-flex min-h-11 items-center gap-1 text-xs font-medium text-text-primary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={() => setOpenCategory(category.label)}
                type="button"
              >
                {category.label}
                <ChevronDown
                  aria-hidden="true"
                  className={`size-3.5 shrink-0 text-text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen ? (
                <ul
                  aria-label={`${category.label} options`}
                  className={`absolute top-full z-50 min-w-52 rounded-xl border border-border bg-surface p-2 shadow-lg shadow-primary/10 ${
                    index >= 6 ? "right-0" : "left-0"
                  }`}
                  id={`category-menu-${index}`}
                >
                  {category.options.map((option) => (
                    <li key={option}>
                      <Link
                        className="block rounded-lg px-3 py-2.5 text-sm text-text-primary transition-colors hover:bg-background-soft hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                        href="/#popular-categories"
                        onClick={() => setOpenCategory(null)}
                      >
                        {option}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
