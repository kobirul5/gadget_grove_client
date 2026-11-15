"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { productCategories } from "@/components/products/catalog";

function getCategoryHref(category: string, parent: string) {
  const params = new URLSearchParams({ category, parent });
  return `/products?${params.toString()}`;
}

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
        {productCategories.map((category, index) => {
          const isOpen = openCategory === index;

          return (
            <li
              className="shrink-0"
              key={category.label}
              onMouseEnter={() => setOpenCategory(index)}
            >
              <div className="flex items-center">
                <Link
                  className={`inline-flex min-h-8 items-center rounded-md px-2.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-3 ${
                    isOpen
                      ? "bg-primary/10 text-primary"
                      : "text-text-primary hover:bg-primary/5 hover:text-primary"
                  }`}
                  href={getCategoryHref(category.label, category.label)}
                  onFocus={() => setOpenCategory(index)}
                >
                  {category.label}
                </Link>
                <button
                  aria-controls="category-mega-menu"
                  aria-expanded={isOpen}
                  aria-label={`Show ${category.label} subcategories`}
                  className="inline-flex min-h-8 items-center rounded-md px-1 text-text-secondary transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  onClick={() => setOpenCategory(isOpen ? null : index)}
                  onFocus={() => setOpenCategory(index)}
                  onMouseEnter={() => setOpenCategory(index)}
                  ref={(element) => {
                    triggerRefs.current[index] = element;
                  }}
                  type="button"
                >
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-3.5 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {openCategory !== null ? (
        <div
          className="absolute inset-x-0 top-full z-50 border-t border-border bg-surface shadow-lg shadow-primary/10"
          id="category-mega-menu"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-x-6 py-4 sm:grid-cols-2 lg:grid-cols-6">
              {productCategories[openCategory].columns.map((column, columnIndex) => (
                <ul
                  aria-label={`${productCategories[openCategory].label} options ${columnIndex + 1}`}
                  className="min-w-0"
                  key={`${openCategory}-${columnIndex}`}
                >
                  {column.map((option) => (
                    <li key={option}>
                      <Link
                        className="flex min-h-10 items-center border-b border-border px-1 text-[13px] font-medium text-text-primary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                        href={getCategoryHref(option, productCategories[openCategory].label)}
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
                  {productCategories[openCategory].label}
                </span>
              </p>
              <Link
                className="inline-flex shrink-0 items-center gap-1 font-semibold text-primary transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-primary"
                href={getCategoryHref(
                  productCategories[openCategory].label,
                  productCategories[openCategory].label,
                )}
                onClick={() => setOpenCategory(null)}
              >
                View All {productCategories[openCategory].label}
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
