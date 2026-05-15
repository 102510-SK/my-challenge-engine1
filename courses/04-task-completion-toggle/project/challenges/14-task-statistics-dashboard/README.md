# Challenge 14: Task Statistics Dashboard

**Work on this challenge only.** You've completed Challenge 13 (due dates). Now read this README and implement this step. Do not remove any code from earlier challenges.

## Goal

Add a **StatsPanel** above the task list showing: total tasks, completed (with percentage), active, overdue. Use `useMemo` to compute statistics so they don't recalculate on every render when tasks haven't changed.

**In practice.** `useMemo` caches a computed value and only recomputes when its dependencies change. Use it when the computation is non-trivial (aggregations, filters, sorts) and the same inputs would produce the same output. In production, this avoids redundant work on every render and keeps expensive derivations predictable and testable.

## What to do

1. **StatsPanel** — Create `src/components/StatsPanel.tsx`. Accept `tasks` (or a pre-computed stats object). Display: Total tasks, Completed (count and percentage), Active (incomplete), Overdue (incomplete and past due date). Use `id="stats-panel"` for the root. Show completion percentage with a progress bar (e.g. `<div role="progressbar">` or a bar with width based on percentage).

2. **useMemo** — Compute statistics (total, completed count, completed %, active count, overdue count) inside the component or in the parent using `useMemo(tasks => { ... }, [tasks])`. Pass the memoized result to StatsPanel so it doesn't recalculate when other state (e.g. filter, search) changes unless tasks change.

3. **Category / priority breakdown** — Optionally show tasks by category and by priority (counts). Use `useMemo` for these aggregates as well.

4. **Wire** — Render StatsPanel above the task list on `/challenge/14-task-statistics-dashboard`. Ensure App passes a prop to TaskApp for this route so StatsPanel is shown (e.g. `showStatsPanel`). Export StatsPanel from `src/components/index.ts`.

5. **Code** — TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: statistics calculate correctly; stats update when tasks change; useMemo used for calculations; completion percentage and progress bar; category/priority breakdowns if required. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → open `/challenge/14-task-statistics-dashboard` → add/complete/delete tasks; stats update; progress bar reflects percentage.
- `npm run review -- --challenge=14-task-statistics-dashboard`
