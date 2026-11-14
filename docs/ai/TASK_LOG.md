# Task Log

## 2026-11-14 — Frontend documentation setup

- Inspected the existing root `AGENTS.md`, frontend package/configuration, App Router pages/layout, shared components, utility, and global stylesheet.
- Added the AI-friendly frontend documentation set under `docs/ai/`.
- Updated the existing root `AGENTS.md` with frontend workflow and task checklist while preserving its existing Next.js guidance block.
- No application source, backend, database, or dependency files were changed.

## 2026-11-14 — Approved Gadget Grove design system

- Documented the owner-provided teal-and-emerald palette, semantic colors, component rules, theme expectations, and accessibility requirements in `UI_DESIGN_SYSTEM.md`.
- Updated `AGENTS.md` to require reading the design-system guidance and inspecting existing CSS tokens before UI implementation.
- Recorded the palette as an approved target, distinct from the neutral starter styles currently in `globals.css`.
- Documentation-only change; no UI styling, application source, backend, or database files were changed.

## 2026-11-14 — Adding design tokens to global styles

- Added the approved light and dark brand palettes and semantic status colors to `src/app/globals.css`.
- Mapped the tokens into Tailwind's CSS-first theme and existing shadcn semantic variables.
- Preserved `.dark` class selection and the existing system dark-mode fallback; no theme switcher or persistence was added.
- Updated the design-system status and decision record. Existing component-level hardcoded colors remain to be migrated.
