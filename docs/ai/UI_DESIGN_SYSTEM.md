# UI Design System

## Status and source of truth

The teal-and-emerald palette and component rules in this document are the approved Gadget Grove design target. The palette tokens are now defined in `src/app/globals.css` and mapped into Tailwind's existing theme.

Global tokens and a persisted light/dark theme toggle are in place, but not every frontend component has been migrated to consume the tokens.

## Design philosophy and brand

Gadget Grove is a modern electronics and gadgets e-commerce platform. Its interface should feel premium, clean, minimal, reliable, easy to navigate, and professional.

The brand identity is teal plus emerald green in both themes:

- Light theme: white, mint green, and teal.
- Dark theme: deep navy and emerald green.

Customer-facing pages and admin pages share the same tokens and brand identity. Theme changes should alter the theme roles, not create separate component implementations.

## Approved color palette

### Light theme

| Token | Value | Intended use |
|---|---|---|
| Primary | `#087F68` | Primary buttons, links, and active states |
| Primary hover | `#066653` | Hover state for primary actions |
| Secondary | `#16A085` | Secondary actions |
| Accent | `#34A853` | Highlights and promotional elements |
| Background | `#FFFFFF` | Main page background |
| Background soft | `#F0FDFA` | Alternate sections |
| Surface | `#FFFFFF` | Cards, modals, and dropdowns |
| Surface secondary | `#F8FAFC` | Secondary surfaces |
| Text primary | `#172B3A` | Main headings and text |
| Text secondary | `#64748B` | Descriptions and supporting text |
| Border | `#E2E8F0` | Borders and dividers |
| Footer | `#142238` | Footer background |

### Dark theme

| Token | Value | Intended use |
|---|---|---|
| Primary | `#20B995` | Primary buttons and active states |
| Primary hover | `#34D399` | Hover state for primary actions |
| Secondary | `#2DD4BF` | Secondary actions |
| Accent | `#34D399` | Highlights and promotional elements |
| Background | `#0B1220` | Main page background |
| Background soft | `#101B2A` | Alternate sections |
| Surface | `#151F2E` | Cards, modals, and dropdowns |
| Surface secondary | `#1D2A3A` | Secondary surfaces |
| Text primary | `#F1F5F9` | Main headings and text |
| Text secondary | `#A0AEC0` | Descriptions and supporting text |
| Border | `#293849` | Borders and dividers |
| Footer | `#080E19` | Footer background |

### Semantic colors

Semantic intent remains consistent across themes. Use these colors only for the stated purpose, and never rely on color alone to communicate status.

| Purpose | Light | Dark | Example |
|---|---|---|---|
| Success | `#15803D` | `#4ADE80` | Completed order or successful payment |
| Warning | `#D97706` | `#FBBF24` | Low stock or pending order |
| Error | `#DC2626` | `#F87171` | Failed payment or form validation error |
| Information | `#2563EB` | `#60A5FA` | Notification or helpful message |

## CSS token architecture

The stylesheet uses Tailwind CSS 4's CSS-first theme and shadcn semantic variables. The approved palette is centralized in `:root` and `.dark`, and the custom roles are exposed through `@theme inline`. Preserve that architecture instead of adding a Tailwind config or scattering palette values through components.

Tailwind roles such as `bg-primary`, `bg-background-soft`, `text-text-secondary`, and `bg-success` resolve to the CSS custom properties. Existing shadcn roles (`--primary`, `--background`, `--card`, `--foreground`, and related variables) are mapped to the approved values to preserve compatibility. Keep one authoritative value per role.

Theme roles are defined for primary, primary hover, secondary, accent, background, soft background, surface, secondary surface, primary and secondary text, border, footer and its light foreground, and success/warning/error/information. Foreground pairings are explicit, including a dark foreground on the brighter dark-theme primary, secondary, and accent colors.

The root declares `color-scheme: light`, `.dark` declares `color-scheme: dark`, and the existing system-preference fallback applies the same dark tokens only when neither `.light` nor `.dark` is explicitly selected.

## Component color rules

### Navigation

- Light theme: white background. Dark theme: surface background.
- Use the theme border token for dividers and borders.
- Keep the logo and brand recognizable in both themes.
- Always use the existing brand asset at `public/logo.png` wherever the Gadget Grove logo is needed; do not replace it with an invented logo, lettermark, or decorative icon.
- Place the brand logo on the theme surface with a theme border; preserve the logo image colors.
- Active navigation uses the primary token.
- The shared Navbar uses the global background, border, primary, and text tokens and links to the implemented storefront sections.

### Buttons

- Primary buttons use the primary and primary-hover tokens. Choose a foreground that meets contrast requirements; do not assume white text is readable on every theme's primary color.
- Secondary buttons use a transparent or surface background, primary border, and primary text.
- Disabled buttons must look and behave disabled, not like active actions.
- Preserve visible keyboard focus.

### Product cards and sections

- Cards use the surface token in both themes.
- Titles use primary text; descriptions use secondary text; prices remain visually prominent.
- Product imagery keeps its original appearance and is not filtered or recolored unnecessarily.
- Discount badges use an appropriate semantic promotional color without implying an error or destructive action.
- Alternate product sections between background and soft background; avoid unrelated colors.

### Forms and feedback

- Inputs use surface background, primary text, secondary-text placeholders, and the border token.
- Focus uses the primary token.
- Validation errors use the error token; success and warning feedback use their own semantic tokens.
- Provide readable labels, accessible names, and non-color status cues.
- Authentication screens use a responsive branded split layout on larger viewports and a simple single-column form on smaller screens.

### Footer

- Light theme uses the footer navy `#142238`; dark theme uses the deeper navy `#080E19`.
- Use readable light text and consistent hover and focus treatment for links.

## Typography, spacing, and responsive behavior

- Keep the existing Geist and Geist Mono fonts configured through `next/font/google` and `--font-geist-sans` / `--font-geist-mono`.
- Maintain a clear heading hierarchy. Product titles must remain readable, prices easy to identify, and secondary information visually subordinate.
- Avoid unnecessary font variations. No separate project type scale is currently defined.
- Use existing Tailwind spacing and responsive utilities consistently; no project-specific spacing scale or custom breakpoints have been found.
- The current radius base is `0.625rem`, with derived radius tokens in `@theme inline`.

## Theme consistency and switching

- Every page, including customer and admin pages, must support both themes using the same semantic roles.
- Never introduce arbitrary component-level colors or duplicate theme-specific component implementations.
- Do not change the approved brand palette without explicit approval.
- Reuse CSS variables and existing Tailwind/shadcn patterns; do not add a theme dependency unless a real requirement justifies it.
- When a theme preference mechanism is implemented, persist the user's choice through that existing mechanism and prevent a theme flash where practical.
- `ThemeToggle` saves an explicit choice under `gadget-grove-theme`. A root-layout inline script applies that choice before paint; without a saved choice, the initial theme follows `prefers-color-scheme`.
- The toggle updates the root `.light` or `.dark` class. If local storage is unavailable, the selection still applies for the current page and the failure to persist is logged.
- Verify navigation, buttons, cards, inputs, dropdowns, modals, focus states, and text contrast in both themes as those components are built.

## Accessibility

- Verify sufficient text and control contrast in both themes, including semantic feedback and button foregrounds.
- Never communicate status using color alone.
- Maintain visible keyboard focus and distinguishable disabled states.
- Ensure links and buttons remain readable and operable in both themes.

## Mandatory UI implementation checklist

Before implementing or changing UI:

1. Read this document.
2. Inspect `src/app/globals.css` and identify the current variables and theme mappings.
3. Reuse existing tokens; do not add arbitrary colors or change the approved palette.
4. Ensure the UI follows the same design tokens in both themes.
5. Check responsive behavior, accessibility, and contrast.
6. Update this document if an approved design-system change is made.

**Design principle:** Gadget Grove maintains one consistent visual identity across customer and admin experiences, regardless of the selected theme.

## Existing implementation details

- Tailwind CSS `4.3.3` is imported in `src/app/globals.css`, alongside `tw-animate-css` and `shadcn/tailwind.css`.
- Tailwind uses CSS-first `@theme inline` and `@custom-variant` directives; no `tailwind.config.*` file was found.
- `components.json` specifies shadcn `base-nova`, a neutral base color, CSS variables, Lucide icons, and `src/app/globals.css`.
- The approved brand and semantic color tokens are defined as hex values in light and dark rules. Chart tokens retain their existing OKLCH values. Radius tokens derive `sm` through `4xl` from `--radius: 0.625rem`.
- The root layout loads Geist and Geist Mono. Shared site components should use semantic theme tokens rather than literal palette colors.
