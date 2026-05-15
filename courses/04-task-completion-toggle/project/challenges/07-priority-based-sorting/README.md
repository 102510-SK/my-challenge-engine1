# Challenge 07: Priority-Based Sorting

**Work on this challenge only.** You've completed Challenge 06 (filtering). Now read this README and implement this step. Do not remove any code from earlier challenges.

## Goal

Add sorting: a sort dropdown with options (Priority: High to Low, Priority: Low to High, Recently Added, Alphabetical). Sorting must work together with the current filter (sort the filtered list).

## What to do

1. **Sort dropdown** — Add a sort control to FilterBar (or next to it): `<select id="sort-order">` with options: "Recently Added" (default), "Priority: High to Low", "Priority: Low to High", "Alphabetical". Priority order: High > Medium > Low.

2. **Sort state** — Hold current sort in state (e.g. `useState` in App or TaskApp). Pass sort value and setter to the component that has the filtered list.

3. **Sort logic** — After filtering, sort the list. Use a copy before sort (e.g. `[...filtered].sort(...)`) so you don't mutate state. Implement: Recently Added = keep original order (by id or creation); Priority High→Low = High first; Low→High = Low first; Alphabetical = by title, case-insensitive.

4. **Order of operations** — First filter (All/Active/Completed), then sort the filtered result. Display the result in TaskList. Ensure the route for this challenge shows FilterBar (with sort dropdown), e.g. pass the same prop you use for Challenge 06 so FilterBar appears.

5. **Code** — TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: sort option changes order; sorting works with active filter; priority order correct; alphabetical case-insensitive; Recently Added preserves order. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → open `/challenge/07-priority-based-sorting` → change sort; list reorders; combine with filter.
- `npm run review -- --challenge=07-priority-based-sorting`
