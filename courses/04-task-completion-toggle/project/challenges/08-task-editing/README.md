# Challenge 08: Task Editing

**Work on this challenge only.** You've completed Challenge 07 (sorting). Now read this README and implement this step. Do not remove any code from earlier challenges.

## Goal

Add inline editing: an Edit button on each TaskCard; clicking it shows editable fields (title, description, priority) with Save and Cancel. Only one task can be in edit mode at a time. Save updates state; Cancel reverts and exits edit mode.

**In practice.** Edit-in-place uses the same controlled-input pattern as forms: one source of truth, clear save/cancel, and no stale UI. In production, inline editing reduces context switching and keeps the user on the same screen; consistent state updates avoid bugs when multiple fields or validations are involved.

## What to do

1. **TaskCard** — Add an "Edit" button. When clicked, switch to edit mode: show inputs/textarea/dropdown pre-filled with current title, description, priority. Show "Save" and "Cancel" buttons. Save: validate title non-empty; call `onUpdateTask(id, { title, description, priority })` and exit edit mode. Cancel: discard changes and exit edit mode. Use local state or a callback to track which task is being edited.

2. **Single edit** — Only one task can be in edit mode at a time. When opening edit for one task, close edit mode for any other (e.g. track `editingId` in parent and pass it down).

3. **App / TaskApp** — Add an update handler: `setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))` or, if using useReducer (Challenge 18), `dispatch({ type: 'UPDATE_TASK', payload: { id, ...updates } })`. Pass it to TaskList/TaskCard as `onUpdateTask`. Validate: title must not be empty when saving.

4. **TaskList** — Accept optional `onUpdateTask` and `editingId`; pass them to each TaskCard.

5. **Code** — TypeScript, functional components, controlled inputs in edit mode, no `console.*`, pass ESLint.

## Review

Tests check: Edit switches to edit mode; fields pre-filled; Save updates and exits; Cancel discards and exits; only one task editable at a time; empty title not saved. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → open `/challenge/08-task-editing` → Edit a task, change fields, Save; Edit another, Cancel; try saving empty title (should not save).
- `npm run review -- --challenge=08-task-editing`
