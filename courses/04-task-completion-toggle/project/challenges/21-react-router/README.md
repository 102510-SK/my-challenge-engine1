# Challenge 21: React Router - Routing and Navigation

**Work on this challenge only.** You've completed Challenge 20 (error boundaries). Now read this README and implement this step. Do not remove any code from earlier challenges.

**Where this fits:** This challenge comes after error boundaries (Ch20). The app already uses React Router for challenge routes; here you add a **dynamic route** (task detail by id) and **Link** from the list so learners practice URL-driven UI.

## Goal

Add a **task detail page** at a URL with a dynamic segment (e.g. `/challenge/21-react-router/task/:id`). Use **Link** to navigate from the task list to a task, **useParams** to read the task id from the URL, and **useNavigate** (or Link) to go back. This challenge teaches routing and URL-driven UI.

**In practice.** Client-side routing keeps the app in one page while the URL drives which view is shown; users can bookmark and share links. In production, React Router (or similar) handles routes, params, and navigation; Link and useNavigate avoid full reloads and keep state in the SPA.

## What to do

1. **Routes** — In `App.tsx`, ensure there is a route for the task detail page: path `/challenge/21-react-router/task/:id` that renders `TaskDetailPage`. The route `/challenge/21-react-router` should show the task list (`TaskApp` with tasks and dispatch). Pass **`linkToTaskDetail`** from App for the list route so the list can render links to each task.

2. **TaskDetailPage** — Create or extend `src/components/TaskDetailPage.tsx`. Use **useParams** from `react-router-dom` to get the `id` from the URL. Find the task by id (e.g. from localStorage using the same key as App: `'task-app-tasks'`). Render the task's title, description, priority, and any other fields. Provide a **"Back to list"** control using **useNavigate** (e.g. `navigate('/challenge/21-react-router')`) or a **Link** to the list. Use `id="task-detail-back"` on the back button and `id="task-detail-page"` on the main wrapper.

3. **Links in the list** — When `linkToTaskDetail` is true, render each task title (or card) as a **Link** to `/challenge/21-react-router/task/{task.id}`. Implement this in TaskApp (pass the prop to TaskList), TaskList (pass to TaskCard), and TaskCard (when `linkToTaskDetail` is true, wrap the title in `<Link to={...}>` from `react-router-dom`).

4. **Code** — TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: route for task detail exists; TaskDetailPage uses useParams and useNavigate (or Link); list links to task detail; back button works. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → open `/challenge/21-react-router` → click a task title → detail page shows → click "Back to list" → list shows.
- `npm run review -- --challenge=21-react-router`
