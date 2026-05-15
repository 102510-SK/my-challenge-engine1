# Challenge 05: Task Deletion

**Work on this challenge only.** You've completed Challenge 04 (toggle). Now read this README and implement this step. Do not remove any code from earlier challenges.

## Goal

Add the ability to delete tasks: a Delete button on each task, browser confirmation before deletion, and immutable state updates using `filter()`.

## What to do

1. **TaskCard** — Add a "Delete" button. When clicked, call `onDelete(task.id)` only after the user confirms. Use `window.confirm("Are you sure?")`; if the user cancels, do nothing.

2. **App** — Add a delete handler (e.g. `handleDelete`) that removes the task by id using `filter()`: `setTasks(prev => prev.filter(t => t.id !== id))`. (In Challenge 18, use `dispatch({ type: 'DELETE_TASK', payload: id })` instead.) Pass it to TaskApp as `onDelete`. Do not mutate the array; return a new array.

3. **TaskApp / TaskList** — Accept optional `onDelete?: (id: string | number) => void` and pass it to each TaskCard. TaskCard shows the Delete button only when `onDelete` is provided.

4. **Route** — The route `/challenge/05-task-deletion` already renders TaskApp. Ensure App passes `onDelete` to TaskApp for this route so the Delete button appears and works.

5. **Task count** — After deletion, the task count (e.g. in `#task-count`) should reflect the new number of tasks.

6. **Code** — TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: Delete button removes task; confirmation dialog appears; canceling confirmation keeps the task; state updates with `filter()`; task count updates. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → open `/challenge/05-task-deletion` → click Delete on a task → confirm → task disappears; try again and cancel → task stays.
- `npm run review -- --challenge=05-task-deletion`
