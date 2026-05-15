# Challenge 23: useRef - Focus Management

**Work on this challenge only.** You've completed Challenge 22 (data fetching). Now read this README and implement this step. Do not remove any code from earlier challenges.

**Where this fits:** This challenge comes after data fetching (Ch22). It builds on **FilterBar** and the search input (Ch9). Here you use **useRef** to access the DOM and focus the search input when the filter bar is shown—common for accessibility and UX (e.g. modals, search panels).

## Goal

Use **useRef** to control focus: when the user is on this challenge's view (task list with filter bar and search), **focus the search input** when the filter bar is shown so they can type immediately. This teaches `useRef`, `.current`, and DOM focus.

**In practice.** `useRef` holds a mutable value that doesn't trigger re-renders; attaching it to a DOM node gives you direct access (e.g. `.current.focus()`). Use it when you need to read or mutate the DOM (focus, scroll, measurements) or keep a stable reference across renders. In production, focus management improves accessibility and UX (e.g. modals, search panels); avoid using refs for data that should drive UI—use state instead.

## What to do

1. **Ref for search input** — In `FilterBar`, create a ref with **useRef**: e.g. `const searchInputRef = useRef<HTMLInputElement>(null)`. Attach it to the search input: `ref={searchInputRef}`. Keep the input's `id="search-input"` so tests can find it.

2. **Focus on mount** — When FilterBar mounts, focus the search input so the user can type right away. Use **useEffect** with an empty dependency array `[]`. Inside the effect, call `searchInputRef.current?.focus()`. Only run the effect once on mount so you don't steal focus on every re-render.

3. **Code** — TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: FilterBar uses useRef; search input has ref and is visible. Architecture check expects **useRef** in the files you change. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → open `/challenge/23-useref-focus-management` → search input should receive focus when the page loads.
- `npm run review -- --challenge=23-useref-focus-management`
