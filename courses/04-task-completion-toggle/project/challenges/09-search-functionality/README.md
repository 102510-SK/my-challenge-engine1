# Challenge 09: Search Functionality

**Work on this challenge only.** You've completed Challenge 08 (editing). Now read this README and implement this step. Do not remove any code from earlier challenges.

## Goal

Add search: a search input that filters tasks by title or description. Search is case-insensitive and works together with status filter and sort. Show "No tasks found" when there are no results; add a "Clear search" button when the user has typed something.

## What to do

1. **Search input** — Add a search field to FilterBar (or above the list): `<input id="search-input" type="text" />`. Hold search text in state (e.g. in TaskApp). Ensure the route for this challenge shows FilterBar (e.g. pass `showFilterBar` from App so FilterBar with search appears).

2. **Search logic** — Filter tasks by search: include a task if its title or description (case-insensitive) includes the search string. Combine with status filter: first filter by All/Active/Completed, then filter by search, then sort. Order: filter → search → sort.

3. **Empty state** — When no tasks match (after filter + search), show a message (e.g. "No tasks found" or "No tasks found for '[search term]'"). You can reuse the same element as Challenge 06 with `id="filter-empty-message"` so one message covers both filter-only and filter+search empty states.

4. **Clear search** — Show a "Clear search" button (e.g. `id="clear-search"`) when the search input has text. Clicking it clears the search and refocuses the list.

5. **Search result count** — Show how many tasks match (e.g. "Showing X of Y tasks" or "X results") so the user knows the result set size.

6. **Code** — TypeScript, functional components, no `console.*`, pass ESLint.

## Review

Tests check: typing filters tasks by title/description; case-insensitive; search combines with status filter; Clear resets search; helpful message when no results. Pass threshold: **≥ 80%**.

## Verify

- `npm run dev` → open `/challenge/09-search-functionality` → type in search; list updates; combine with filter; clear search.
- `npm run review -- --challenge=09-search-functionality`
