# Challenge 13: Due Dates and Sorting

**Work on this challenge only.** You've completed Challenge 12 (categories and tags). Now read this README and implement this step. Do not remove any code from earlier challenges.

## Goal

Add an optional **due date** to tasks. Display it on TaskCard; highlight overdue incomplete tasks; add a sort option "Due Date (Soonest First)"; show labels like "Overdue", "Due Today", "Due Soon".

## What to do

1. **Task type** — Add optional `dueDate?: string` (e.g. ISO date string) or `dueDate?: number` (timestamp). Tasks without a due date are valid; handle `undefined` when displaying and sorting.

2. **TaskForm** — Add a date input for due date (optional). Use `<input type="date" />` or store ISO string. When creating/editing, set `dueDate` on the task or leave undefined.

3. **TaskCard** — Display due date in a readable format (e.g. `new Date(dueDate).toLocaleDateString()`). Add labels: "Overdue" (past due, not completed), "Due Today", "Due Soon" (e.g. within 3 days). Use `data-overdue="true"` or a class for overdue styling (e.g. red). Use `id="task-due-date"` for the due date element.

4. **Sort** — Add sort option "Due Date (Soonest First)" to FilterBar's sort dropdown. Tasks with due dates first, ordered by date ascending; tasks without due date can go at the end. Handle null/undefined due dates in sort. Ensure the route `/challenge/13-due-dates-and-sorting` shows FilterBar (App passes `showFilterBar` to TaskApp) so the sort option is visible.

5. **Code** — TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: can set due date when creating/editing; due dates display in readable format; overdue incomplete tasks highlighted; sort by due date works; "Due Today" indicator; tasks without due date handled. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → open `/challenge/13-due-dates-and-sorting` → add task with due date; set one overdue; sort by due date; check labels.
- `npm run review -- --challenge=13-due-dates-and-sorting`
