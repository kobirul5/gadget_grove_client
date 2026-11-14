# Frontend Decisions

This file records decisions evidenced by the current frontend; it does not prescribe unverified backend behavior.

| Decision | Evidence / rationale |
|---|---|
| Use the Next.js App Router in the existing `src/` directory. | Routes and root layout are under `src/app/`; TypeScript aliases resolve `@/*` to `src/*`. |
| Organize auth, user, and admin page files with route groups in the same application. | `(auth)`, `(user)`, and `(admin)` route folders currently contain login, account, and dashboard pages. Group names do not form URL segments. |
| Keep the shared header in the root layout. | `src/app/layout.tsx` imports and renders `Navbar` around route children. |
| Use Tailwind CSS 4 with CSS-first theme variables. | `globals.css` imports Tailwind and declares `@theme inline`, theme variables, and responsive utility use. |
| Use Geist fonts and the Base UI button wrapper. | Root layout loads Geist fonts; `src/components/ui/button.tsx` wraps `@base-ui/react/button`. |
| Keep current UI pages server-rendered unless client interaction is needed. | Inspected pages/components contain no `"use client"` directives or client state. |
| Frontend API and auth behavior remain undocumented until implemented and verified. | No request client, auth flow, endpoint, or credential handling was found in `src/`. |

Update this log when a significant frontend architecture or design decision is made, including the evidence and trade-offs.
