# Routing and Pages

The application uses the Next.js App Router. Parenthesized route groups organize files but do not appear in the URL.

| URL | Page file | Current responsibility/state |
|---|---|---|
| `/` | `src/app/page.tsx` | Composes the home section components in reference order: hero and service strip, `Popular Categories`, `New Trends`, `Featured Products`, collection banners, `Flash Sale`, `Trending Now`, and `Top Brand Products`. Product content is UI sample data; no catalog API is connected. |
| `/login` | `src/app/(auth)/login/page.tsx` | Sign-in form preview with links to registration and password recovery; authentication submission is not connected. |
| `/register` | `src/app/(auth)/register/page.tsx` | Account registration form preview with links to login and OTP verification; account creation is not connected. |
| `/forgot-password` | `src/app/(auth)/forgot-password/page.tsx` | Password recovery form preview with links to login and OTP verification; code delivery is not connected. |
| `/verify-otp` | `src/app/(auth)/verify-otp/page.tsx` | Six-digit email verification form preview linked from registration and password recovery; code verification is not connected. |
| `/reset-password` | `src/app/(auth)/reset-password/page.tsx` | New password form preview; password updates are not connected. |
| `/account` | `src/app/(user)/account/page.tsx` | Placeholder that returns `null`. |
| `/dashboard` | `src/app/(admin)/dashboard/page.tsx` | Placeholder that returns `null`. |

All routes inherit `src/app/layout.tsx`, which imports `globals.css` and renders the global `Navbar` before route content and global `Footer` after it. There are no route-specific layouts in the inspected tree. `src/app/favicon.ico` is present.

All authentication pages are visitable through their direct URLs and cross-links. Forms are intentionally preview-only until a real frontend API/authentication contract is provided; submit buttons are disabled rather than implying successful authentication. No product, cart, or checkout pages were found.
