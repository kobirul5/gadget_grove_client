# Components

## Shared components

| Component | Location | Responsibility and current use |
|---|---|---|
| `Navbar` | `src/components/shared/Navbar.tsx` | Responsive Gadget Grove header rendered globally by the root layout. Uses the brand logo at `public/logo.png` on a theme-aware surface with a token border, links to actual home-page sections, and a Sign in link to `/login`. Uses global theme tokens. |
| `ThemeToggle` | `src/components/shared/ThemeToggle.tsx` | Accessible light/dark theme toggle used by the Navbar. Applies the corresponding root class and saves the selection in local storage. |
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

`src/app/page.tsx` composes these sections. Shared home UI and static data:

- `src/components/home/SectionTitle.tsx` renders a reusable section heading and optional link.
- `src/components/home/ProductCard.tsx` renders compact and full product cards.
- `src/components/home/data.ts` provides static category, brand, and sample product data.

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
