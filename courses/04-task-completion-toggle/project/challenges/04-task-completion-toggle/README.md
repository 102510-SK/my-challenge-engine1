# Challenge 04: Task Completion Toggle

**Work on this challenge only.** You've completed Challenge 03 (TaskForm). Now read this README and implement this step.

## Goal

Add completion: checkbox on each TaskCard toggles completed state; strike-through and different background for completed tasks; count shows "X of Y completed".

## What to do

1. **TaskCard**  
   Accept `completed` (boolean) and `onToggle` (function). Render a checkbox when `onToggle` is provided; call `onToggle` on click. When completed: strike-through on title/description and distinct style (e.g. `data-completed="true"` or a class).

2. **TaskApp**  
   Toggle handler: given task id, update state immutably (e.g. `setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))`). TaskApp receives `tasks` and `setTasks` (or `dispatch` in Challenge 18) from App and passes `onToggle` and `completed` to each TaskCard via TaskList.

3. **Task count**  
   Show "X of Y completed" (e.g. "2 of 5 completed") in an element with `id="task-count"`.

4. **Route and wiring**  
   You don’t change `App.tsx`. It already renders `<TaskApp tasks={...} setTasks={...} showForm countFormat="completed" />` at `/challenge/04-task-completion-toggle`. `TaskApp` imports `TaskList` and `TaskForm` from `./components`, holds the toggle handler, and passes `onToggle` and `completed` to TaskList (which passes them to each TaskCard). Update **TaskCard** to accept `completed` and `onToggle` and render the checkbox and styles; update **TaskList** to pass them through and show "X of Y completed" in `id="task-count"`. No new files; no change to `index.ts`.

5. **Code**  
   TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: checkbox toggles completed; completed tasks have strike-through/background; count "X of Y completed"; state updated immutably; E2E toggle and count. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → open `/challenge/04-task-completion-toggle` → toggle a task (strike-through and count update).
- `npm run review -- --challenge=04-task-completion-toggle`
