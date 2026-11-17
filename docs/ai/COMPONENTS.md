# Components

## Shared components

| Component | Location | Responsibility and current use |
|---|---|---|
| `CartProvider`, `useCart` | `src/components/cart/CartProvider.tsx` | Shares cart items between product details and the Navbar and persists product slugs and quantities to browser `localStorage`. |
| `CartPage` | `src/components/cart/CartPage.tsx` | Client-side `/cart` view of saved products with quantity controls, removal, and subtotal; checkout is not implemented. |
| `Navbar` | `src/components/shared/navbar/Navbar.tsx` | Responsive Gadget Grove header rendered globally by the root layout. Uses the brand logo at `public/logo.png`, a secondary product-category navigation row, and the search/cart/favorites/theme/sign-in tools. Search suggestions navigate to matching local sample products. |
| `CategoryNavigation` | `src/components/shared/navbar/CategoryNavigation.tsx` | Accessible, responsive category mega-menu backed by shared catalog category metadata. Category and subcategory links, including “View All,” open the matching `/products` listing. |
| `NavbarTools` | `src/components/shared/navbar/NavbarTools.tsx` | Client-side search over the local sample catalog with matching product suggestions, plus the saved-cart and favorites panels. |
| `ThemeToggle` | `src/components/shared/navbar/ThemeToggle.tsx` | Accessible light/dark theme toggle used by the Navbar. Applies the corresponding root class and saves the selection in local storage. |
| `Footer` | `src/components/shared/Footer.tsx` | Gadget Grove brand footer with shop/account links and service highlights. Rendered globally by the root layout after route content. |

## Authentication components

| Component | Location | Responsibility |
|---|---|---|
| `AuthCard` | `src/components/auth/AuthCard.tsx` | Shared responsive, theme-aware split layout for auth screens, with a readable branded product/category panel, page heading, content, and footer link. |
| `AuthField` | `src/components/auth/AuthField.tsx` | Accessible labeled input used by authentication page previews. |
| `RegisterForm`, `ForgotPasswordForm`, `VerifyOtpForm`, `VerifyOtpPageContent`, `ResetPasswordForm` | `src/components/auth/` | Client-side form validation and demo navigation through registration and recovery steps. `VerifyOtpForm` uses six accessible single-digit boxes with paste, keyboard navigation, and one-time-code autofill support; OTP page query state is read inside a Suspense boundary. No credentials or verification state are persisted. |

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
| `ProductDetailPage` | `src/components/products/ProductDetailPage.tsx` | Reusable responsive details template driven by a `Product` prop. Shows the selected item's name, category, price, image, and related-product links; the HP Pavilion sample has additional images and specs. Cart additions persist in browser `localStorage`; compare, tabs, and quantity selection use local UI state. |
| `ProductListingClient` | `src/components/products/ProductListingClient.tsx` | Reusable category/subcategory listing with metadata-driven filters, sorting, result counts, pagination, and URL-synchronized state. It filters the local sample catalog in the browser without a product API. |
| Product catalog metadata | `src/components/products/catalog.ts` | Shared category navigation definitions, category matching terms, and filter groups used by both the Navbar and product listings. |

`src/app/page.tsx` composes these sections. Shared home UI and static data:

- `src/components/home/SectionTitle.tsx` renders a reusable section heading and optional link.
- `src/components/home/ProductCard.tsx` renders compact and full product cards.
- `src/components/home/data.ts` provides static category, brand, and sample product data plus optional filter attributes, slug generation, and the deduplicated `allProducts` lookup used by listing and details routes.

## UI primitives

| Component | Location | Responsibility and usage |
|---|---|---|
| `Button` | `src/components/ui/button.tsx` | Wraps `@base-ui/react/button`, composes Tailwind classes with `cn`, and supports `variant` and `size` variants via `class-variance-authority`. |
The Button variants are `default`, `outline`, `secondary`, `ghost`, `destructive`, and `link`; sizes are `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, and `icon-lg`. The current Navbar and home page use token-styled links and do not use this Button primitive.

## Utilities

| Utility | Location | Responsibility |
|---|---|---|
| `cn` | `src/lib/utils.ts` | Re-exports `cn` from the installed `cn` package for composing class names. |

## Conventions

- Search these locations before creating a duplicate component or utility.
- Follow the established `@/components/...` and `@/lib/...` import aliases.
- Keep generic UI primitives in `src/components/ui/` and site-level shared components in `src/components/shared/`.
- No hook files or component tests were found in the inspected `src/` tree.
