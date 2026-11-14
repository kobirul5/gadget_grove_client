# Project Overview

## Purpose and current state

Gadget Grove is the intended e-commerce website, with customer-facing and admin experiences in one Next.js frontend. The checked-in UI is currently an early starter rather than a functioning storefront: the home page still contains the default Next.js starter content, and the login, account, and dashboard pages are placeholders.

This documentation covers frontend code only. It does not describe backend services, databases, or server implementation.

## Technology

Versions and tools below are taken from `package.json`:

- Next.js `16.4.6`
- React and React DOM `19.3.0`
- TypeScript `^5` (the dependency range is not an exact installed patch version)
- Tailwind CSS `4.3.3`
- Base UI React `^1.9.0`, used by the shared button
- shadcn CLI/configuration `^4.23.0`, with the `base-nova` style setting
- Lucide React `^1.73.0`
- Bun `1.3.12` as the declared package manager

## Frontend layout

- The project uses the `src/` directory and the Next.js App Router.
- Route files, the root layout, and global styles are under `src/app/`.
- Shared UI lives in `src/components/`; the `ui/` subdirectory currently contains a button.
- `src/lib/utils.ts` re-exports the `cn` utility.
- The TypeScript alias `@/*` resolves to `src/*`.
- The admin route is in the same application and inherits the root layout.

## Features visible in the current frontend

- A root navigation bar with a Dashboard link and sample navigation labels.
- A default Next.js starter home page.
- Route placeholders for login, account, and dashboard.
- Global Tailwind theme variables and a reusable button component.

No working catalog, cart, checkout, account workflow, authentication, admin workflow, or frontend API integration was found in the inspected source.

## Project commands

- `bun run dev` starts the development server.
- `bun run build` runs the Next.js production build.
- `bun run start` starts the production server.
- `bun run lint` runs ESLint.
- `package.json` does not define a separate test or TypeScript-check script.
