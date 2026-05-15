# Challenge 19: Performance Optimization

**Work on this challenge only.** You've completed Challenge 18 (useReducer). Now read this README and implement this step. Do not remove any code from earlier challenges.

## Goal

Optimize performance: wrap TaskCard with **React.memo**; use **useCallback** for functions passed to children; use **useMemo** for filter/search/sort computations. Ensure no functionality is broken.

**In practice.** Use these only when you measure a real performance issue: `React.memo` avoids re-renders when props are unchanged; `useCallback`/`useMemo` keep referential equality so memoized children don't re-render unnecessarily. In production, apply them to hot paths (long lists, heavy computations); overusing them adds complexity without benefit.

## What to do

1. **React.memo (TaskCard)** — Wrap the TaskCard component with `React.memo` so it only re-renders when its props change. Export: `export default React.memo(TaskCard)`. Ensure props are compared correctly (primitives and stable callbacks).

2. **useCallback** — For all handler functions passed from App/TaskApp to TaskList/TaskCard (e.g. onToggle, onDelete, onUpdateTask), wrap them in `useCallback` with the appropriate dependency array. Example: `const handleToggle = useCallback((id) => { ... }, [dispatch])` in TaskApp when using dispatch, or `[setTasks]` when using setTasks; in App, `const handleDelete = useCallback((id) => { ... }, [])` (empty deps if dispatch is stable). This prevents child re-renders when the parent re-renders but the handler logic hasn't changed.

3. **useMemo for derived data** — For the filtered/sorted task list (and search, filter, sort logic), use `useMemo` so the computed list is only recalculated when tasks, filter, sort, or search change. Example: `const displayedTasks = useMemo(() => { ... filter and sort ... }, [tasks, filter, sortOrder, searchTerm])`.

4. **Optional: render count** — In development, you can add a render count display on TaskCard (e.g. `data-render-count`) to verify fewer re-renders after optimization. Not required for tests.

5. **No functionality change** — All features must work the same. Only add memoization; don't change behavior.

6. **Code** — TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: TaskCard wrapped with React.memo; useCallback used for passed handlers; useMemo used for filter/search/sort; no functionality broken. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → use add, edit, delete, filter, search; verify everything still works; check React DevTools Profiler for fewer re-renders if desired.
- `npm run review -- --challenge=19-performance-optimization`
