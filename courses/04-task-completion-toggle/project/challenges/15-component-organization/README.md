# Challenge 15: Component Organization with Props

**Work on this challenge only.** You've completed Challenge 14 (stats dashboard). Now read this README and implement this step. Do not remove any code from earlier challenges.

## Goal

Refactor for better organization: extract reusable **Button**, **Badge**, **StatusIndicator**, and **FormInput** components. Use props and destructuring; maintain all existing functionality.

## What to do

1. **Button** — Create `src/components/Button.tsx`. Accept props: `children`, `onClick`, `type?: 'button' | 'submit'`, `variant?: 'primary' | 'secondary' | 'danger'`, optional `disabled`, `id`. Use it for "Add Task", "Save", "Cancel", "Delete", "Clear search", etc. Replace existing `<button>` elements where it makes sense.

2. **Badge** — Create `src/components/Badge.tsx`. Accept `children`, optional `variant` or `type` (e.g. for tags, category, priority). Use it for tags, category label, priority label on TaskCard.

3. **StatusIndicator** — Create `src/components/StatusIndicator.tsx`. Accept props for status: e.g. "overdue", "due-today", "due-soon", "completed". Render a small label or icon. Use it on TaskCard for Overdue, Due Today, Due Soon.

4. **FormInput** — Create `src/components/FormInput.tsx`. Accept `label`, `id`, `value`, `onChange`, `type`, `placeholder`, optional `error`. Use it in TaskForm for title, description, and in FilterBar for search. Reduces duplication and keeps form fields consistent.

5. **Props** — Use TypeScript interfaces for each component; destructure props in the component signature. Document expected props in a comment or type export.

6. **No functionality change** — All features (add, edit, delete, filter, search, etc.) should work the same after refactor. Only structure changes.

7. **Code** — TypeScript, functional components, no `console.*`, pass ESLint. Export new components from `src/components/index.ts`.

## Review

Tests check: reusable components exist and accept props; props destructured; no functionality broken; code more maintainable. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → use all features; everything works as before; Button, Badge, StatusIndicator, FormInput used where appropriate.
- `npm run review -- --challenge=15-component-organization`
