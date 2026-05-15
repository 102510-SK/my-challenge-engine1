# Challenge 22: Data Fetching - Loading and Error State

**Work on this challenge only.** You've completed Challenge 21 (routing). Now read this README and implement this step. Do not remove any code from earlier challenges.

**Where this fits:** This challenge comes after routing (Ch21). It builds on **useEffect** (Ch10, Ch11) and **useState** to teach async data loading—loading state, error state, and displaying fetched data. Industry apps almost always load data from an API.

## Goal

Create a view that **fetches** a list of items from an API, shows a **loading** state while the request is in progress, shows an **error** state if the request fails, and displays the **data** when successful. Use `fetch` and `useEffect`. This challenge teaches real-world async data loading.

**In practice.** Async data in React is usually done in `useEffect`: trigger fetch on mount (or when deps change), set loading/error/data in state, and clean up (e.g. AbortController) to avoid setting state after unmount. In production, always show loading and error states so the UI never appears broken or stuck; cleanup prevents memory leaks and React warnings.

## What to do

1. **API** — Use the mock API at **`/api/todos.json`** (static JSON in the project's `public/api` folder). It returns an array of items with `id` and `title`. Fetch from this URL when the component mounts.

2. **FetchDemoView** — Create or extend `src/components/FetchDemoView.tsx`. Use **useState** for: `items` (or `data`), `loading` (boolean), `error` (string | null). Use **useEffect** (dependency `[]`) to call `fetch('/api/todos.json')` on mount. Set loading to true before the request; when the response arrives, check `res.ok` (if not ok, throw), parse JSON, set items and set loading to false; in catch, set error and set loading to false. Use a cancelled flag or AbortController in the effect cleanup to avoid setting state after unmount.

3. **UI** — Render conditionally: if **loading**, show an element with `id="fetch-loading"` (e.g. "Loading..."). If **error**, show an element with `id="fetch-error"` with the error message. If **data**, show a list with `id="fetch-list"` and list items showing each item's title. Only one of loading, error, or data should be visible at a time.

4. **Code** — TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: loading state shown initially or during fetch; error state shown on failure; list shown when data loads; fetch from correct URL. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → open `/challenge/22-data-fetching` → see "Loading..." then the list (or error if fetch fails).
- `npm run review -- --challenge=22-data-fetching`
