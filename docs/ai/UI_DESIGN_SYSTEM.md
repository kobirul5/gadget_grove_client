# UI Design System

## Styling stack

- Tailwind CSS `4.3.3` is imported in `src/app/globals.css`.
- `tw-animate-css` and `shadcn/tailwind.css` are also imported there.
- Tailwind is configured with the CSS-first `@theme inline` and `@custom-variant` directives; no `tailwind.config.*` file was found.
- The shadcn settings are in `components.json`: `base-nova`, neutral base color, CSS variables, Lucide icons, and `src/app/globals.css` as the stylesheet.

## Colors and theme

`globals.css` defines light and dark CSS custom properties with OKLCH values for background, foreground, primary, secondary, muted, accent, destructive, border, input, ring, card, popover, charts, and sidebar roles. The same role names are mapped into Tailwind's inline theme.

A `.dark` class supplies a dark palette. A `prefers-color-scheme: dark` media query also overrides root colors when `:root` is not marked `.light`. The inspected UI does not include a theme toggle. `Navbar` additionally uses literal dark colors (`#111111`, `#2b2b30`, and white) in its own class names.

## Typography

The root layout loads Geist and Geist Mono through `next/font/google` and exposes `--font-geist-sans` and `--font-geist-mono`. Tailwind's sans and mono roles reference these variables. No separate type scale or font-size tokens are declared in the inspected theme.

## Spacing, radii, and breakpoints

- Spacing, sizing, and layout currently use Tailwind utility classes directly; there is no project-specific spacing scale in the inspected CSS.
- `--radius` is `0.625rem`, with derived `sm`, `md`, `lg`, and `xl` through `4xl` radius tokens.
- The current Navbar uses Tailwind's `sm:` and `md:` responsive variants. No custom breakpoint values were found; use the existing Tailwind defaults unless the project adds an explicit token.

Prefer the existing CSS variables and Tailwind utility patterns. Avoid adding one-off design tokens or dependencies without a design requirement.
