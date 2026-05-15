# Challenge 16: Context API - Theme Management

**Work on this challenge only.** You've completed Challenge 15 (component organization). Now read this README and implement this step. Do not remove any code from earlier challenges.

## Goal

Add dark/light theme switching using React Context. Create a ThemeContext with Provider; add a theme toggle in the header (or above the list); apply theme to all components; persist theme choice in localStorage.

**In practice.** Context is for data that many components need without passing props through every level (e.g. theme, locale, auth). Use it when prop drilling becomes noisy or the same value is read in many places. In production, a small context (theme, user) keeps the tree simple; avoid putting frequently changing data in context or every consumer re-renders.

## What to do

1. **ThemeContext** — Create `src/contexts/ThemeContext.tsx` (or `src/contexts/ThemeContext.ts`). Use `createContext` for theme state: e.g. `'light' | 'dark'`. Provide a value object: `{ theme, setTheme, toggleTheme }`. Wrap the app (or the relevant subtree) with a Provider that holds theme state (`useState`) and provides it.

2. **useTheme** — Create a custom hook `useTheme()` that calls `useContext(ThemeContext)` and returns the context value. Use it in components that need theme (avoid prop drilling).

3. **Theme toggle** — Add a toggle button (e.g. in a header or next to FilterBar). Use `useTheme()` to get `theme` and `toggleTheme`; clicking toggles between light and dark. Use `id="theme-toggle"` for tests.

4. **Apply theme** — Apply theme to the app: set CSS variables, class on root (e.g. `data-theme="dark"`), or inline styles for backgrounds and text. All main UI (TaskList, TaskCard, TaskForm, FilterBar, StatsPanel) should reflect the theme.

5. **Persist** — Save theme to localStorage (e.g. key `'task-app-theme'`) when it changes. On load, read from localStorage and set initial theme so it persists across refreshes.

6. **Code** — TypeScript, functional components, no `console.*`, pass ESLint. Export ThemeContext and useTheme from an index or the context file.

## Review

Tests check: ThemeContext provides theme globally; components use useContext/useTheme; toggle switches theme; theme persists; no prop drilling for theme. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → toggle theme; all components update; refresh → theme persists.
- `npm run review -- --challenge=16-context-api-theme`
