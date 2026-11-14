# Frontend Architecture

## Application structure

The frontend is in `src/` and uses the App Router:

- `src/app/` contains the root layout, global styles, and route segments.
- Route groups `(auth)`, `(user)`, and `(admin)` organize pages without adding those group names to their URLs.
- `src/components/shared/` contains shared page chrome.
- `src/components/ui/` contains reusable UI primitives.
- `src/lib/` contains shared utilities.

No nested route-group layouts, route handlers, middleware, context providers, or frontend service/data layers were found in the inspected source.

## Layout and rendering

`src/app/layout.tsx` is the root layout. It imports global CSS, loads Geist and Geist Mono through `next/font/google`, sets the document language to English, and renders `Navbar` around every route's children. It does not render the existing `Footer`.

The pages and components inspected do not declare `"use client"`, so they use the App Router's default Server Component behavior. Keep components server-rendered unless interactivity or browser-only APIs require a Client Component.

`next.config.ts` enables `cacheComponents` and `partialPrefetching`, and configures the Tailwind Turbopack CSS loader. Preserve these settings unless a justified architecture change is needed.

## Request and data flow

No frontend API client, request calls, query library, or data-fetching hooks were found in `src/`. Current pages render local JSX and do not load application data. Do not infer backend contracts from the route names or page placeholders.

## Navigation

The root `Navbar` uses `next/link` for `/` and `/dashboard`. Its other sample navigation items and Contact button use in-page fragment links. See [ROUTING_AND_PAGES.md](ROUTING_AND_PAGES.md) for the routes currently represented by page files.
