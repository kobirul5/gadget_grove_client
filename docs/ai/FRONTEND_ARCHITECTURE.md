# Frontend Architecture

## Application structure

The frontend is in `src/` and uses the App Router:

- `src/app/` contains the root layout, global styles, and route segments.
- Route groups `(auth)`, `(user)`, and `(admin)` organize pages without adding those group names to their URLs.
- `src/components/shared/` contains shared page chrome.
- `src/components/home/` contains the home page's individual section components and shared static sample data.
- `src/components/products/` contains the reusable product details page, whose slug lookup and generated routes use the local sample catalog in `src/components/home/data.ts`.
- `src/components/ui/` contains reusable UI primitives.
- `src/lib/` contains shared utilities.

No nested route-group layouts, route handlers, middleware, context providers, or frontend service/data layers were found in the inspected source.

## Layout and rendering

`src/app/layout.tsx` is the root layout. It imports global CSS, loads Geist and Geist Mono through `next/font/google`, sets the document language to English, and renders the shared `Navbar`, route children, and shared `Footer` in that order. A small inline head script applies a saved light/dark preference before paint, or selects the system preference when none is saved. The Footer is global and appears on every route.

The root `src/app/page.tsx` composes the home-page section components in display order. Section markup is kept under `src/components/home/`; static sample product and category content is centralized in `src/components/home/data.ts`.

Pages and components remain Server Components by default. `src/components/shared/ThemeToggle.tsx` is a narrowly scoped Client Component because it interacts with the DOM and browser local storage.
Authentication forms use small Client Components for browser validation and demo route navigation. The OTP route reads its query string in a Client Component wrapped with Suspense so the page can still prerender.

`next.config.ts` enables `cacheComponents` and `partialPrefetching`, and configures the Tailwind Turbopack CSS loader. Preserve these settings unless a justified architecture change is needed.

## Request and data flow

No frontend API client, request calls, query library, or data-fetching hooks were found in `src/`. Current pages render local JSX and do not load application data. Do not infer backend contracts from the route names or page placeholders.

## Navigation

The root `Navbar` uses `next/link` for the home page, implemented home-page sections, and `/login`. Its `ThemeToggle` updates the root theme class and persists explicit choices. See [ROUTING_AND_PAGES.md](ROUTING_AND_PAGES.md) for the routes currently represented by page files.
