# Challenge 10: useEffect - Local Storage Persistence

**Work on this challenge only.** You've completed Challenge 09 (search). Now read this README and implement this step. Do not remove any code from earlier challenges.

## Goal

Persist tasks across page refreshes using `useEffect` and `localStorage`. Save tasks whenever they change; load tasks from storage on mount. Handle missing or invalid data gracefully.

**In practice.** `useEffect` is for side effects that depend on React state or props (e.g. syncing to localStorage, subscriptions, or APIs). You run logic after render and optionally clean up on unmount or when deps change. In production, persisting to localStorage in an effect keeps the UI in sync with storage without blocking render; handling parse errors avoids crashes when data is corrupted or from an older version.

## What to do

1. **Save on change** — Use `useEffect` to write tasks to localStorage whenever the tasks array changes. Use a key (e.g. `'task-app-tasks'`). Serialize with `JSON.stringify(tasks)`.

2. **Load on mount** — On initial load, read from localStorage. Parse with `JSON.parse`. If the key is missing or parse fails, use the default initial tasks (don't crash). Set the parsed tasks into state so the app shows persisted data.

3. **Dependencies** — The effect that saves should depend on `tasks` so it runs when tasks change. The effect that loads should run once on mount (empty dependency array `[]` or run load logic only when appropriate).

4. **Preserve properties** — Ensure all task fields (id, title, description, priority, completed, and later category, tags, dueDate) are saved and restored. Use the same shape as your Task type. (In Challenge 18, tasks may be managed with useReducer; persistence still works by saving the state that comes from the reducer.)

5. **No infinite loops** — Avoid updating state in a way that retriggers the save effect endlessly. Save when tasks change; load only once (or when mounting).

6. **Code** — TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: tasks persist after refresh; new tasks saved; edits and deletions persist; completion status persists; app works when localStorage is empty; no infinite re-renders. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → add/edit/delete/complete tasks → refresh page → tasks still there.
- `npm run review -- --challenge=10-useeffect-local-storage`
