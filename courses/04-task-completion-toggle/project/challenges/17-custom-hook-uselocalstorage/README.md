# Challenge 17: Custom Hook - useLocalStorage

**Work on this challenge only.** You've completed Challenge 16 (theme context). Now read this README and implement this step. Do not remove any code from earlier challenges.

## Goal

Extract localStorage logic into a reusable **useLocalStorage** hook. Use it for both tasks and theme persistence. The hook should behave like `useState` but sync with localStorage.

**In practice.** Custom hooks extract stateful logic so multiple components can reuse it without duplication. They compose built-in hooks (useState, useEffect) and keep components focused on UI. In production, hooks like useLocalStorage, useDebounce, or useFetch are shared across the app and simplify testing and reuse.

## What to do

1. **useLocalStorage** — Create a custom hook (e.g. in `src/hooks/useLocalStorage.ts`). Signature: `useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void]`. On mount, read from localStorage; parse JSON; if missing or invalid, use `initialValue`. When the setter is called, update state and write to localStorage with `JSON.stringify`. Handle parse errors (use try/catch); on error, return initialValue and don't crash.

2. **Use for tasks** — Replace direct localStorage read/write for tasks in App with `const [tasks, setTasks] = useLocalStorage('task-app-tasks', INITIAL_TASKS)`. Remove any manual useEffect that only saved/loaded tasks to localStorage; the hook handles it. (If you completed Challenge 18 with useReducer, you can use useLocalStorage to get initial state and pass it to useReducer, or keep useReducer and sync to localStorage in an effect—either approach is valid.)

3. **Use for theme** — In ThemeContext (or where theme is stored), use `useLocalStorage('task-app-theme', 'light')` for theme state so theme persistence is handled by the hook.

4. **Naming** — Hook name must start with `use` (React convention). Export from `src/hooks/useLocalStorage.ts` and optionally `src/hooks/index.ts`.

5. **Code** — TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: useLocalStorage returns [value, setValue]; persists to localStorage; handles JSON; used for tasks and theme; errors handled gracefully. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → add tasks, change theme, refresh; both persist. No duplicate localStorage logic.
- `npm run review -- --challenge=17-custom-hook-uselocalstorage`
