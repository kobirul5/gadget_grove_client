# Routing and Pages

The application uses the Next.js App Router. Parenthesized route groups organize files but do not appear in the URL.

| URL | Page file | Current responsibility/state |
|---|---|---|
| `/` | `src/app/page.tsx` | Default Next.js starter landing page; not yet a Gadget Grove storefront. |
| `/login` | `src/app/(auth)/login/page.tsx` | Placeholder that returns `null`. |
| `/account` | `src/app/(user)/account/page.tsx` | Placeholder that returns `null`. |
| `/dashboard` | `src/app/(admin)/dashboard/page.tsx` | Placeholder that returns `null`. |

All routes inherit `src/app/layout.tsx`, which renders the global `Navbar` and imports `globals.css`. There are no route-specific layouts in the inspected tree. `src/app/favicon.ico` is present.

No product, cart, checkout, registration, or other application pages were found. Add route documentation when actual route files are introduced or changed.
