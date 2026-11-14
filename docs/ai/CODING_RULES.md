# Coding Rules

These rules describe observed conventions and safe extensions for the current frontend.

## Naming and structure

- Use the existing `src/app/`, `src/components/`, and `src/lib/` structure; do not add another source root.
- Use route-group directories in parentheses for organizational grouping without changing the URL.
- Follow existing PascalCase component filenames and component names (for example, `Navbar.tsx` and `Navbar`); use descriptive filenames for App Router special files such as `page.tsx` and `layout.tsx`.
- Prefer the existing `@/*` alias for imports from `src/`.
- Check for reusable components and utilities before adding another implementation.

## TypeScript and React

- Keep strict TypeScript enabled and provide clear types for props and data.
- Use React function components consistent with the existing pages and components.
- Prefer Server Components. Add `"use client"` only when client-side interactivity or browser-only behavior requires it.
- Keep state local where possible and follow [STATE_MANAGEMENT.md](STATE_MANAGEMENT.md) before introducing shared state or data fetching.

## Styling and accessibility

- Use Tailwind utilities and the CSS custom properties in `src/app/globals.css`; follow [UI_DESIGN_SYSTEM.md](UI_DESIGN_SYSTEM.md).
- Use the shared `Button` and other existing primitives rather than recreating them.
- Preserve semantic HTML, accessible names, keyboard behavior, visible focus, and appropriate link/button semantics.
- Check layouts at existing responsive variants, including `sm:` and `md:`.

## Quality and scope

- Do not add dependencies without need; Bun is the declared package manager.
- Never invent API behavior, expose secrets, or change backend/database files.
- Avoid unrelated edits. Run relevant lint, TypeScript, and build checks and update documentation when frontend behavior or structure changes.
