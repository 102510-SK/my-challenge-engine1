# Challenge 03: Adding New Tasks

**Work on this challenge only.** You've completed Challenge 02 (TaskApp, TaskList with `map`). Now read this README and implement this step.

## Goal

Add a **TaskForm**: controlled inputs (title, description, priority dropdown), "Add Task" button, unique IDs for new tasks, validation for empty title, and clear form after submit.

**In practice.** Controlled components (input value tied to state + onChange) are the standard in React for forms. They give you a single source of truth, validation before submit, and consistent behavior across browsers. In production, controlled inputs plus local state (or form libraries) are how most forms are built.

## What to do

1. **TaskForm** — Create `src/components/TaskForm.tsx`.  
   Prop: `onAddTask` (function that receives the new task: `id`, `title`, `description`, `priority`, `completed: false`).

2. **Wire into the app** — In `src/components/index.ts`, add:
   ```ts
   export { default as TaskForm } from './TaskForm'
   ```
   **How it works:** `App.tsx` renders `<TaskApp tasks={...} setTasks={...} showForm countFormat="tasks" />` at `/challenge/03-adding-new-tasks`. `TaskApp` imports `TaskForm` and `TaskList`, implements `handleAddTask` (e.g. `setTasks(prev => [...prev, task])` or, in Challenge 18, `dispatch({ type: 'ADD_TASK', payload: task })`), and passes it to TaskForm as `onAddTask`. Once TaskForm exists and is exported from `index.ts`, the app will use it on this route.

3. **Controlled inputs**  
   Title (text), description (text/textarea), priority (dropdown: Low/Medium/High). All controlled: `value` + `onChange` bound to state. Use `id="task-title"` on the title input so tests can find it.

4. **Submit**  
   "Add Task" button. On submit: `preventDefault`; validate title non-empty; if valid, call `onAddTask` with new task (id from `Date.now()` or `crypto.randomUUID()`), then clear form. If title empty, show error in an element with `id="task-form-error"` (e.g. "Title is required").

5. **Code**  
   TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: form with title, description, priority; controlled inputs; Add Task adds task and clears form; empty title shows error and does not add; E2E add task and empty-title error. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → open `/challenge/03-adding-new-tasks` → add a task (appears, form clears); submit with empty title (error).
- `npm run review -- --challenge=03-adding-new-tasks`
