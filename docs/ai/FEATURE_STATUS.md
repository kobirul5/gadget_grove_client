# Feature Status

Status reflects the frontend source inspected for this documentation setup. A route existing does not mean its feature is implemented.

## Present

- Next.js App Router application with root layout and global styles.
- Responsive Gadget Grove navigation with storefront section links, a Sign in link, theme-token colors, and Geist fonts.
- Accessible Navbar light/dark theme toggle with saved preference and system-theme default.
- Visitable authentication page previews at `/login`, `/register`, `/forgot-password`, `/verify-otp`, and `/reset-password`, with links between screens.
- Reusable Base UI-backed button.
- Tailwind CSS theme variables and global light/dark palette tokens.
- Responsive Gadget Grove storefront structured around the supplied home-page reference, with hero, service strip, category icons, static product collections, promotional banners, flash-sale cards, trending list, and brand product section.
- Home page sections implemented as separate components under `src/components/home/`.
- Branded global footer with links to existing frontend routes and home-page sections.

## Starter content / placeholders

- Home page product names, prices, ratings, counts, and service claims are static presentation samples and are not backed by a product API.
- Authentication page forms are UI-only; submit buttons remain disabled because no authentication API or behavior has been implemented.
- `/account` and `/dashboard` render `null`.
- `/dashboard` is a placeholder route and is not linked from the storefront navigation.
- Root layout metadata uses Gadget Grove branding.

## Not found in the inspected frontend

- Functional product catalog, search/filter, cart, checkout, or order history.
- Functional login, registration, OTP verification, password recovery, authentication state, or account management.
- Admin dashboard functionality or role/permission UI.
- Frontend API integration, request/error/loading handling, or data-fetching state.
- Working category filters, product actions, forms, validation rules, tests, or a feature-specific state-management solution.

## Known issues

- The Navbar links to the implemented homepage sections; Sign in navigates to the placeholder `/login` route.
- Product imagery and catalog details are static samples, not connected to a product API.

No development roadmap or ongoing work was present in the inspected frontend documentation or files. Future status updates should be based on actual code or confirmed project requirements.
