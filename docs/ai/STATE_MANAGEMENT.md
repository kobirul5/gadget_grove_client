# State Management

## Current implementation

The shared cart uses a React context in `src/components/cart/CartProvider.tsx`. It stores product slugs and quantities in the browser's `localStorage` under `gadget-grove-cart`, restores them on load, synchronizes changes between tabs, and exposes cart state to product details, the Navbar, `/cart`, and `/checkout`. The cart page can update quantities and remove items. `/checkout` also accepts one product and quantity from the product details Buy Now action. Submitting checkout stores a demo order, including customer delivery details, under a unique `gadget-grove-order-*` key in browser `localStorage`; the cart is cleared after successful cart checkout. The confirmation page reads that saved record. Orders are not sent to a server, and customer/order data is limited to the current browser profile.

The shared `ThemeToggle` is a small Client Component that updates the root theme class and stores the explicit user preference in `localStorage`; the root layout applies that preference before paint and otherwise follows the system color preference. Authentication forms use local Client Component handlers for browser validation and demo navigation between screens; they do not store credentials or create authenticated state.

The `/products` listing reads category, filters, sorting, and pagination from the URL query string using `useSearchParams`. Native `history.replaceState` updates filters and sorting without a full navigation; pagination uses `pushState` so users can return to the previous page state. Listing results are derived from the local sample catalog and no data-fetching hooks, query/cache library usage, or request calls are used.

## Guidance for future work

- Keep static and server-renderable UI as Server Components.
- Introduce a Client Component only where browser interaction, client state, or browser APIs require it; isolate the client boundary as narrowly as practical.
- Keep the theme preference in sync between `gadget-grove-theme` in local storage and the root `.light` / `.dark` class. If storage is unavailable, the toggle still changes the current page theme.
- Cart contents are local to the current browser profile and device; they are not account-synced or persisted on a server.
- Keep listing state in the URL so category pages can be shared and reloaded. Add catalog attributes in `src/components/home/data.ts` and category-specific filter definitions in `src/components/products/catalog.ts` when adding sample or API-backed product data.
- Follow an established project pattern before adding a state library. Document any architectural choice and the features that depend on it.
- If data fetching is introduced, document the actual frontend mechanism and its error/loading behavior here and in [FRONTEND_API_INTEGRATION.md](FRONTEND_API_INTEGRATION.md).

Do not treat placeholder pages as evidence of implemented state or data flows.
