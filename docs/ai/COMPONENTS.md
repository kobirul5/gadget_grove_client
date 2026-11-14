# Components

## Shared components

| Component | Location | Responsibility and current use |
|---|---|---|
| `Navbar` | `src/components/shared/Navbar.tsx` | Site header and navigation. Rendered globally by the root layout. It contains a `/` link, a `/dashboard` link, sample fragment navigation, and a Contact fragment link. |
| `Footer` | `src/components/shared/Footer.tsx` | Currently renders an empty `<footer />`. It is not mounted in the root layout or any inspected page. |

## UI primitives

| Component | Location | Responsibility and usage |
|---|---|---|
| `Button` | `src/components/ui/button.tsx` | Wraps `@base-ui/react/button`, composes Tailwind classes with `cn`, and supports `variant` and `size` variants via `class-variance-authority`. Used by `Navbar`. |

The Button variants are `default`, `outline`, `secondary`, `ghost`, `destructive`, and `link`; sizes are `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, and `icon-lg`.

## Utilities

| Utility | Location | Responsibility |
|---|---|---|
| `cn` | `src/lib/utils.ts` | Re-exports `cn` from the installed `cn` package for composing class names. |

## Conventions

- Search these locations before creating a duplicate component or utility.
- Follow the established `@/components/...` and `@/lib/...` import aliases.
- Keep generic UI primitives in `src/components/ui/` and site-level shared components in `src/components/shared/`.
- No hook files or component tests were found in the inspected `src/` tree.
