# Components

## Shared components

| Component | Location | Responsibility and current use |
|---|---|---|
| `Navbar` | `src/components/shared/Navbar.tsx` | Site header and navigation. Rendered globally by the root layout. It contains a `/` link, a `/dashboard` link, sample fragment navigation, and a Contact fragment link. |
| `Footer` | `src/components/shared/Footer.tsx` | Gadget Grove brand footer with shop/account links and service highlights. Rendered globally by the root layout after route content. |

## Home page section components

| Component | Location | Responsibility |
|---|---|---|
| `HeroSection` | `src/components/home/HeroSection.tsx` | Hero banners and service-benefit strip. |
| `PopularCategoriesSection` | `src/components/home/PopularCategoriesSection.tsx` | Category icon links. |
| `NewTrendsSection` | `src/components/home/NewTrendsSection.tsx` | Compact new-trend product cards. |
| `FeaturedProductsSection` | `src/components/home/FeaturedProductsSection.tsx` | Featured product cards. |
| `PromoBannersSection` | `src/components/home/PromoBannersSection.tsx` | Smartwatch and tablet collection banners. |
| `FlashSaleSection` | `src/components/home/FlashSaleSection.tsx` | Static sale product cards. |
| `TrendingNowSection` | `src/components/home/TrendingNowSection.tsx` | Horizontal trending-product rows. |
| `TopBrandProductsSection` | `src/components/home/TopBrandProductsSection.tsx` | Brand labels and featured product cards. |

`src/app/page.tsx` composes these sections. Shared home UI and static data:

- `src/components/home/SectionTitle.tsx` renders a reusable section heading and optional link.
- `src/components/home/ProductCard.tsx` renders compact and full product cards.
- `src/components/home/data.ts` provides static category, brand, and sample product data.

## UI primitives

| Component | Location | Responsibility and usage |
|---|---|---|
| `Button` | `src/components/ui/button.tsx` | Wraps `@base-ui/react/button`, composes Tailwind classes with `cn`, and supports `variant` and `size` variants via `class-variance-authority`. Used by `Navbar`. |
The Button variants are `default`, `outline`, `secondary`, `ghost`, `destructive`, and `link`; sizes are `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, and `icon-lg`. The current home page uses token-styled links and does not use this Button primitive.

## Utilities

| Utility | Location | Responsibility |
|---|---|---|
| `cn` | `src/lib/utils.ts` | Re-exports `cn` from the installed `cn` package for composing class names. |

## Conventions

- Search these locations before creating a duplicate component or utility.
- Follow the established `@/components/...` and `@/lib/...` import aliases.
- Keep generic UI primitives in `src/components/ui/` and site-level shared components in `src/components/shared/`.
- No hook files or component tests were found in the inspected `src/` tree.
