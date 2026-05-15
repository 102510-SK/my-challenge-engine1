# Challenge 20: Error Boundaries and Error Handling

**Work on this challenge only.** You've completed Challenge 19 (performance). Now read this README and implement this step. Do not remove any code from earlier challenges.

## Goal

Add error handling: an **ErrorBoundary** class component that catches rendering errors and shows fallback UI; wrap TaskList (or task list area) in it; add try/catch for localStorage operations; handle invalid JSON gracefully.

**In practice.** Error boundaries catch JavaScript errors in the tree below them and show fallback UI instead of a blank screen. They don't catch event-handler or async errors—use try/catch there. In production, wrapping route-level or feature-level subtrees in boundaries limits blast radius and gives users a way to recover (e.g. Retry) instead of losing the whole app.

## What to do

1. **ErrorBoundary** — Create `src/components/ErrorBoundary.tsx` as a **class component**. Implement `static getDerivedStateFromError` and/or `componentDidCatch` to set state with `hasError: true`. In render, if `hasError`, show fallback UI with text like "Something went wrong" (tests match case-insensitively) and a "Retry" button that resets error state (`setState({ hasError: false })`). Use `id="error-boundary-fallback"` for the fallback container and `id="error-retry"` for the Retry button so tests can find them.

2. **Wrap TaskList** — Wrap the task list (or the component that renders TaskList) in `<ErrorBoundary>`. If a TaskCard or child throws during render, the boundary catches it and shows the fallback instead of crashing the whole app.

3. **localStorage try/catch** — In useLocalStorage (or wherever you read/write localStorage), wrap `JSON.parse` and `localStorage.setItem` in try/catch. On parse error, return initialValue and don't throw. Log errors in development if desired.

4. **User-friendly messages** — In the fallback UI, show a short message (e.g. "Something went wrong. Please try again."). When localStorage fails, don't show a raw error to the user; use a safe default and optionally log to console in dev.

5. **Code** — TypeScript; ErrorBoundary can be a class component; rest functional; no `console.*` in production (optional in dev). Pass ESLint. Export ErrorBoundary from `src/components/index.ts`.

## Review

Tests check: ErrorBoundary catches rendering errors; fallback UI displays; Retry button resets state; localStorage errors don't crash app; invalid JSON handled; error messages user-friendly. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → force an error in a child (e.g. throw in TaskCard) to see fallback; click Retry; verify localStorage error handling by corrupting stored data.
- `npm run review -- --challenge=20-error-boundaries`
