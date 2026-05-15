# Challenge 06: Task Filtering

**Work on this challenge only.** You've completed Challenge 05 (delete). Now read this README and implement this step. Do not remove any code from earlier challenges.

## Goal

Add filtering so users can view **All**, **Active** (incomplete), or **Completed** tasks. Use derived state (compute filtered list from the full task array); do not store a separate state for filtered tasks.

## What to do

1. **FilterBar** — Create `src/components/FilterBar.tsx`. Buttons: "All", "Active", "Completed". Accept props: `filter: 'all' | 'active' | 'completed'` and `onFilterChange: (filter) => void`. Highlight the active filter button (e.g. `data-active="true"` or a class). Root element: `id="filter-bar"`.

2. **Filter state** — In App (or TaskApp), add state for current filter: `useState<'all' | 'active' | 'completed'>('all')`. Pass filter and setter to the component that renders FilterBar and TaskList.

3. **Filtering logic** — Compute filtered tasks from the full task array: All = all tasks; Active = `tasks.filter(t => !t.completed)`; Completed = `tasks.filter(t => t.completed)`. Do not modify the original task array. Use this derived list for rendering; keep the full array in state unchanged.

4. **Empty state** — When no tasks match the filter, show a message (e.g. "No tasks match this filter") in an element with `id="filter-empty-message"`.

5. **Filtered count** — Show "Showing X of Y tasks" (e.g. in `#task-count` or a dedicated element) when filtering. Use `id="task-count"` for the count display.

6. **Wire** — Render FilterBar above the task list on `/challenge/06-task-filtering`. You can hold filter state in TaskApp and render FilterBar there; ensure App passes a prop to TaskApp for this route so FilterBar is shown (e.g. `showFilterBar`). Export FilterBar from `src/components/index.ts`.

7. **Code** — TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: filter buttons change displayed tasks; active filter is highlighted; empty state when no match; filtered count correct; original task array unmodified. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → open `/challenge/06-task-filtering` → click Active/Completed/All; count and list update; empty state when none match.
- `npm run review -- --challenge=06-task-filtering`
