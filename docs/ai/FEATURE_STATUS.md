# Feature Status

Status reflects the frontend source inspected for this documentation setup. A route existing does not mean its feature is implemented.

## Present

- Next.js App Router application with root layout and global styles.
- Responsive Gadget Grove navigation with storefront section links, a Sign in link, theme-token colors, and Geist fonts.
- Navbar product search with local-catalog suggestions, a cart panel backed by browser `localStorage` with a link to `/cart`, and a favorites empty-state panel.
- Accessible Navbar light/dark theme toggle with saved preference and system-theme default.
- Visitable authentication screens at `/login`, `/register`, `/forgot-password`, `/verify-otp`, and `/reset-password`; registration and recovery screens support browser-side validation and client-side demo navigation.
- Reusable Base UI-backed button.
- Tailwind CSS theme variables and global light/dark palette tokens.
- Responsive Gadget Grove storefront structured around the supplied home-page reference, with hero, service strip, category icons, static product collections, promotional banners, flash-sale cards, trending list, and brand product section.
- A shared responsive product details page at `/products/[slug]`, with a route generated for every distinct local storefront sample product. Product cards and trending rows link to their matching slug. The HP Pavilion has additional sample images and specifications; other products show their available listing data and neutral generic details.
- A reusable `/products` listing for all products, navigation categories, subcategories, and home-page category links. Category-aware filters, multi-value selections, price sorting, newest/popularity sorting, result counts, pagination, and clear-filter actions are synchronized with URL query parameters and run against the local sample catalog.
- A `/cart` page showing saved products, quantities, line totals, and subtotal, with controls to change quantities or remove items.
- Guest `/checkout` flow for placing the whole cart order or going directly from a product's Buy Now action with its selected quantity. Checkout collects contact and delivery details, supports cash on delivery, saves a local demo order, and displays its `/order-confirmation` page.
- Responsive `/dashboard` admin UI with reusable navigation shell, order-derived metrics/revenue chart/category summaries, searchable recent orders, and product count from the shared browser-local admin catalog.
- `/dashboard/products` product administration demo with sample-catalog KPIs, search/category/stock filters, sorting, pagination, CSV export, and browser-local add/edit/delete and publish-status controls.
- `/dashboard/inventory` inventory demo with sample stock alerts, category/status filters, pagination, and browser-local stock adjustment and alert acknowledgement.
- Home page sections implemented as separate components under `src/components/home/`.
- Branded global footer with links to existing frontend routes and home-page sections.

## Starter content / placeholders

- Home page product names, prices, ratings, counts, and service claims are static presentation samples and are not backed by a product API.
- Product imagery, specifications, ratings, and related-product listings are static samples, not backed by a product API.
- Cart additions and edits persist product slugs and quantities in browser `localStorage` and appear in the shared Navbar cart panel and `/cart`; they are not synced to an account or server.
- Checkout orders and customer delivery details are saved only in browser `localStorage`. No order reaches the store, and payment, shipping fees, and fulfillment are not connected.
- Favorites and compare remain frontend-only UI and do not persist.
- Authentication does not connect to a backend: demo routes do not create accounts, deliver/verify codes, or change passwords; login remains disabled.
- `/account` renders `null`.
- Admin dashboard is not authenticated/role-protected. Product management, publish switches, and inventory changes are browser-local demos; they do not update the storefront catalog or a server. Order status and orders saved in other browsers remain unavailable.
- Root layout metadata uses Gadget Grove branding.

## Not found in the inspected frontend

- Server-backed product catalog, cart, checkout, order history, payment, or fulfillment.
- Functional login, registration, OTP verification, password recovery, authentication state, or account management.
- Server-backed admin catalog/inventory management or admin role/permission enforcement.
- Frontend API integration, request/error/loading handling, or data-fetching state.
- Product category filters use only the attributes present in the local sample catalog; no server-backed filtering or feature-specific state-management solution exists.

## Known issues

- The Navbar links to the implemented homepage sections; Sign in navigates to the placeholder `/login` route. Category navigation leads to `/products`, which uses the local catalog.
- Product imagery and catalog details are static samples, not connected to a product API.

No development roadmap or ongoing work was present in the inspected frontend documentation or files. Future status updates should be based on actual code or confirmed project requirements.
