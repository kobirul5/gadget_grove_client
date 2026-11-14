# State Management

## Current implementation

No state-management library, React context/provider, custom hook, or client-side state use (`useState`, `useReducer`) was found in `src/`. The inspected components are Server Components and currently render static JSX.

No data-fetching hooks, query/cache library usage, or request calls were found in `src/`.

## Guidance for future work

- Keep static and server-renderable UI as Server Components.
- Introduce a Client Component only where browser interaction, client state, or browser APIs require it; isolate the client boundary as narrowly as practical.
- Follow an established project pattern before adding a state library. Document any architectural choice and the features that depend on it.
- If data fetching is introduced, document the actual frontend mechanism and its error/loading behavior here and in [FRONTEND_API_INTEGRATION.md](FRONTEND_API_INTEGRATION.md).

Do not treat placeholder pages as evidence of implemented state or data flows.
