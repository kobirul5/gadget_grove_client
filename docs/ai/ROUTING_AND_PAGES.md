# Routing and Pages

The application uses the Next.js App Router. Parenthesized route groups organize files but do not appear in the URL.

| URL | Page file | Current responsibility/state |
|---|---|---|
| `/` | `src/app/page.tsx` | Composes the home section components in reference order: hero and service strip, `Popular Categories`, `New Trends`, `Featured Products`, collection banners, `Flash Sale`, `Trending Now`, and `Top Brand Products`. Product content is UI sample data; no catalog API is connected. |
| `/products/[slug]` | `src/app/products/[slug]/page.tsx` | Shared details route for every distinct product in the local storefront sample data. `generateStaticParams` creates a page per sample product; URL param access is contained in a Suspense boundary with a loading fallback, and unknown slugs return not found. The HP Pavilion has extra sample images and specifications; other products show the available name, category, image, and pricing. Add to Cart and Buy Now update the shared cart, which persists product slugs and quantities in browser `localStorage`; no product API is connected. |
| `/login` | `src/app/(auth)/login/page.tsx` | Sign-in form preview with links to registration and password recovery; authentication submission is not connected. |
| `/register` | `src/app/(auth)/register/page.tsx` | Registration form navigates to `/verify-otp` with the entered email after browser validation. |
| `/forgot-password` | `src/app/(auth)/forgot-password/page.tsx` | Recovery form navigates to `/verify-otp` with the entered email and password-reset flow. |
| `/verify-otp` | `src/app/(auth)/verify-otp/page.tsx` | Six-digit code form displays the supplied email; Continue navigates to login for signup or reset-password for recovery. |
| `/reset-password` | `src/app/(auth)/reset-password/page.tsx` | New password form checks confirmation and navigates to login. |
| `/account` | `src/app/(user)/account/page.tsx` | Placeholder that returns `null`. |
| `/dashboard` | `src/app/(admin)/dashboard/page.tsx` | Placeholder that returns `null`. |

All routes inherit `src/app/layout.tsx`, which imports `globals.css` and renders the global `Navbar` before route content and global `Footer` after it. There are no route-specific layouts in the inspected tree. `src/app/favicon.ico` is present.

All authentication pages are visitable through their direct URLs and cross-links. Registration/recovery flows support client-side demo navigation and browser-side field validation only; they do not create accounts, send email, verify codes, or update passwords. Product cards and related-product rows link to the shared slug-based product details route. Cart additions persist in browser `localStorage`; no product API, server-synced cart, or checkout flow is connected.
