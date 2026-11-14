<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Frontend Development Workflow

- Read this `AGENTS.md` before starting a task. Consult [`docs/ai/DOCUMENTATION_INDEX.md`](docs/ai/DOCUMENTATION_INDEX.md) and read only the documentation relevant to the task.
- Use targeted searches and inspect only relevant frontend files; do not scan the project unnecessarily.
- Search for and reuse existing components, hooks, and utilities before creating new ones.
- Follow the existing Next.js architecture, naming, coding, state-management, and styling patterns.
- Use Server and Client Components appropriately; keep strict TypeScript typing.
- Build responsive, accessible interfaces and consider frontend performance.
- Never invent backend API behavior. Never modify backend or database files.
- Never expose environment variables or secrets. Avoid unrelated file changes and unnecessary dependencies.
- Verify changes with relevant checks before reporting completion.
- Update relevant frontend documentation after significant changes.

## Frontend Task Checklist

For frontend tasks, read the relevant documentation after consulting the index, inspect applicable source files, make a short implementation plan, implement the change, run relevant lint, TypeScript, and build checks, review for regressions, update relevant documentation, and report the changed files and checks performed.
