# Challenge 18: useReducer - Complex State Management

**Work on this challenge only.** You've completed Challenge 17 (useLocalStorage). Now read this README and implement this step. Do not remove any code from earlier challenges.

## Goal

Refactor task state management to use **useReducer** instead of useState for tasks. Define a reducer with actions: ADD_TASK, UPDATE_TASK, DELETE_TASK, TOGGLE_TASK, SET_TASKS (for initialization). Use action constants and optional action creators.

**In practice.** `useReducer` fits when one state object has many update cases or the next state depends on the previous in a structured way. Reducers are pure and easy to test; dispatch is stable. In production, complex forms, lists with multiple actions, or state machines often use useReducer (or Redux) to keep updates predictable and debuggable.

## What to do

1. **Action types** — Define constants: `ADD_TASK`, `UPDATE_TASK`, `DELETE_TASK`, `TOGGLE_TASK`, `SET_TASKS`. Use them in the reducer and when dispatching to avoid typos.

2. **Reducer** — Create a reducer function: `(state: Task[], action: Action) => Task[]`. Handle each action:
   - ADD_TASK: return `[...state, action.payload]`
   - UPDATE_TASK: return `state.map(t => t.id === action.payload.id ? { ...t, ...action.payload } : t)`
   - DELETE_TASK: return `state.filter(t => t.id !== action.payload)`
   - TOGGLE_TASK: return `state.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t)`
   - SET_TASKS: return `action.payload` (for initialization from localStorage or useLocalStorage)
   The reducer must be pure (no side effects, no mutating state).

3. **useReducer** — In App (or where tasks live), replace `useState(initialTasks)` with `useReducer(taskReducer, initialTasks)`. Use `dispatch` to perform add, update, delete, toggle. Pass `tasks` and `dispatch` (instead of `setTasks`) from App to TaskApp for all challenge routes; TaskApp should call `dispatch({ type: 'ADD_TASK', payload: task })` and `dispatch({ type: 'TOGGLE_TASK', payload: id })` (and App uses `dispatch({ type: 'DELETE_TASK', payload: id })` for delete). If you use useLocalStorage for tasks, you can dispatch SET_TASKS when loading from storage.

4. **Action creators** — Optionally create helper functions: `addTask(task)`, `updateTask(id, updates)`, `deleteTask(id)`, `toggleTask(id)`, `setTasks(tasks)` that return the action object. Use them when calling dispatch.

5. **Functionality** — All existing features (add, edit, delete, toggle, filter, search, sort, persist) should work the same; only the internal state update mechanism changes to useReducer.

6. **Code** — TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: all task operations go through reducer; reducer is pure; action types are constants; functionality works identically; state updates predictable. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → add, edit, delete, toggle tasks; filter, search, sort; persist; all work as before.
- `npm run review -- --challenge=18-usereducer-complex-state`
