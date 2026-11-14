# Routing and Pages

The application uses the Next.js App Router. Parenthesized route groups organize files but do not appear in the URL.

| URL | Page file | Current responsibility/state |
|---|---|---|
| `/` | `src/app/page.tsx` | Composes the home section components in reference order: hero and service strip, `Popular Categories`, `New Trends`, `Featured Products`, collection banners, `Flash Sale`, `Trending Now`, and `Top Brand Products`. Product content is UI sample data; no catalog API is connected. |
| `/products/hp-pavilion-16` | `src/app/products/hp-pavilion-16/page.tsx` | Sample HP Pavilion 16 laptop details page, linked from its featured-product card. Includes image gallery, product specifications, description, warranty, and related-product panels. Product data and cart feedback are client-side samples; no catalog, cart, or checkout API is connected. |
| `/login` | `src/app/(auth)/login/page.tsx` | Sign-in form preview with links to registration and password recovery; authentication submission is not connected. |
| `/register` | `src/app/(auth)/register/page.tsx` | Registration form navigates to `/verify-otp` with the entered email after browser validation. |
| `/forgot-password` | `src/app/(auth)/forgot-password/page.tsx` | Recovery form navigates to `/verify-otp` with the entered email and password-reset flow. |
| `/verify-otp` | `src/app/(auth)/verify-otp/page.tsx` | Six-digit code form displays the supplied email; Continue navigates to login for signup or reset-password for recovery. |
| `/reset-password` | `src/app/(auth)/reset-password/page.tsx` | New password form checks confirmation and navigates to login. |
| `/account` | `src/app/(user)/account/page.tsx` | Placeholder that returns `null`. |
| `/dashboard` | `src/app/(admin)/dashboard/page.tsx` | Placeholder that returns `null`. |

All routes inherit `src/app/layout.tsx`, which imports `globals.css` and renders the global `Navbar` before route content and global `Footer` after it. There are no route-specific layouts in the inspected tree. `src/app/favicon.ico` is present.

All authentication pages are visitable through their direct URLs and cross-links. Registration/recovery flows support client-side demo navigation and browser-side field validation only; they do not create accounts, send email, verify codes, or update passwords. No product, cart, or checkout pages were found.
