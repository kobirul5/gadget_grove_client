# Routing and Pages

The application uses the Next.js App Router. Parenthesized route groups organize files but do not appear in the URL.

| URL | Page file | Current responsibility/state |
|---|---|---|
| `/` | `src/app/page.tsx` | Composes the home section components in reference order: hero and service strip, `Popular Categories`, `New Trends`, `Featured Products`, collection banners, `Flash Sale`, `Trending Now`, and `Top Brand Products`. Product content is UI sample data; no catalog API is connected. |
| `/login` | `src/app/(auth)/login/page.tsx` | Placeholder that returns `null`. |
| `/account` | `src/app/(user)/account/page.tsx` | Placeholder that returns `null`. |
| `/dashboard` | `src/app/(admin)/dashboard/page.tsx` | Placeholder that returns `null`. |

All routes inherit `src/app/layout.tsx`, which imports `globals.css` and renders the global `Navbar` before route content and global `Footer` after it. There are no route-specific layouts in the inspected tree. `src/app/favicon.ico` is present.

No product, cart, checkout, registration, or other application pages were found. Add route documentation when actual route files are introduced or changed.
