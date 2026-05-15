# Challenge 01: Static Task Display

**Work on this challenge only.** After you finish and run review, move on to the next challenge. You don't need to read other challenge READMEs yet.

## Goal

Create the foundation of your task app: a **TaskCard** component, a **TaskList** that shows 3 hardcoded tasks, and semantic HTML with basic styling.

## What to do

1. **TaskCard** — Create `src/components/TaskCard.tsx`.  
   Props: `title`, `description`, `priority` (Low/Medium/High). Root: `<article id="task-card">`. Title in `<h2>`, description in `<p>`, priority as text. Use a TypeScript interface.

2. **TaskList** — Create `src/components/TaskList.tsx`.  
   Render 3 hardcoded TaskCard components. Root: `<section id="task-list">`. Use titles **Task One**, **Task Two**, **Task Three** and include a description with **First hardcoded task** and priority **Priority: High** so automated tests can find them. Export a `Task` interface from this file (e.g. `id`, `title`, `description`, `priority`, `completed`) — App uses it for state in later challenges.

3. **Wire into the app** — Export your components from `src/components/index.ts` so the app can use them. Add:
   ```ts
   export { default as TaskCard } from './TaskCard'
   export { default as TaskList } from './TaskList'
   ```
   **How it works:** `App.tsx` imports from `./components` (that file re-exports whatever you put in `index.ts`). The route `/challenge/01-static-task-display` already renders `<TaskList />`. Once TaskCard and TaskList exist and are exported from `index.ts`, the app will build and this route will show your list. The app will not build until those files exist—that’s expected; create minimal placeholders for TaskForm and TaskApp (see below).

   **Placeholders so the app builds:** The app also imports **TaskForm** and **TaskApp** (used on other challenge routes). Create minimal placeholders so the app compiles:
   - `src/components/TaskForm.tsx`: e.g. `export default function TaskForm() { return null }`
   - `src/components/TaskApp.tsx`: e.g. `export default function TaskApp() { return null }` (they can accept `...props` if you prefer)
   Add their exports to `index.ts`. You will implement these components in later challenges.

4. **Styling**  
   Basic CSS: cards with borders and spacing (App.css, index.css, or component styles).

5. **Code**  
   TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: 3 tasks visible; TaskCard shows title, description, priority; semantic HTML (`section`, `article`, `h2`, `p`); E2E on the route. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → open `/challenge/01-static-task-display` → see 3 tasks.
- `npm run review -- --challenge=01-static-task-display`
