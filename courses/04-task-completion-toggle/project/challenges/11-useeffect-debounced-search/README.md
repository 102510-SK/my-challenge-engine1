# Challenge 11: useEffect - Debounced Search

**Work on this challenge only.** You've completed Challenge 10 (localStorage). Now read this README and implement this step. Do not remove any code from earlier challenges.

## Goal

Debounce the search input: delay applying the search by 300ms after the user stops typing. Show a "Searching..." indicator during the delay. Use `useEffect` with a cleanup function to cancel pending timeouts and avoid memory leaks.

**In practice.** Debouncing defers an action until after a quiet period, so you don't run expensive work (or API calls) on every keystroke. In production, cleanup in `useEffect` (clear timeout, abort fetch) is required to avoid memory leaks and updating state after unmount; this pattern is common for search, resize handlers, and any async effect.

## What to do

1. **Debounce logic** — Hold the raw search input value in state. Use a separate state (or derived value) for the "effective" search term that drives filtering. In a `useEffect`, when the raw value changes, set a timeout (300ms) to update the effective search term. Return a cleanup function that clears the timeout so previous timeouts don't run after unmount or when the value changes again.

2. **Searching indicator** — Show "Searching..." (e.g. in an element with `id="searching-indicator"`) when the user has typed but the debounced value hasn't updated yet (i.e. within the 300ms window).

3. **Filtering** — Use the debounced (effective) search term for filtering the task list, not the raw input value. The input can update immediately for responsive typing; the list updates after 300ms of no typing.

4. **Cleanup** — In the effect cleanup, call `clearTimeout` on the pending timeout. This prevents stale updates and memory leaks when the component unmounts or when the user types again before 300ms.

5. **Route and wiring** — Ensure the route `/challenge/11-useeffect-debounced-search` shows FilterBar (App passes `showFilterBar` to TaskApp for this route) so the search input and "Searching..." indicator are visible.

6. **Code** — TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: search doesn't run on every keystroke; "Searching..." shows during delay; search runs 300ms after typing stops; cleanup clears timeouts; no memory leaks. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → open `/challenge/11-useeffect-debounced-search` → type quickly; "Searching..." appears; list updates after pause.
- `npm run review -- --challenge=11-useeffect-debounced-search`
