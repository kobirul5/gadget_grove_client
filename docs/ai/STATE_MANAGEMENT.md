# State Management

## Current implementation

No state-management library, React context/provider, custom hook, or shared React client state was found in `src/`. The shared `ThemeToggle` is a small Client Component that updates the root theme class and stores the explicit user preference in `localStorage`; the root layout applies that preference before paint and otherwise follows the system color preference.

No data-fetching hooks, query/cache library usage, or request calls were found in `src/`.

## Guidance for future work

- Keep static and server-renderable UI as Server Components.
- Introduce a Client Component only where browser interaction, client state, or browser APIs require it; isolate the client boundary as narrowly as practical.
- Keep the theme preference in sync between `gadget-grove-theme` in local storage and the root `.light` / `.dark` class. If storage is unavailable, the toggle still changes the current page theme.
- Follow an established project pattern before adding a state library. Document any architectural choice and the features that depend on it.
- If data fetching is introduced, document the actual frontend mechanism and its error/loading behavior here and in [FRONTEND_API_INTEGRATION.md](FRONTEND_API_INTEGRATION.md).

Do not treat placeholder pages as evidence of implemented state or data flows.
