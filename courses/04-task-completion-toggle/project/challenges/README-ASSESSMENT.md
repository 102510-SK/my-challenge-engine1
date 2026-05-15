# README assessment (learner perspective)

I solved all four challenges using **only the challenge READMEs** (no project README, no peeking at tests). Then I ran the review for each challenge. Here’s what worked and what could be clearer for beginners.

---

## Review results (README-only implementation)

| Challenge | Score | Pass (≥80%) |
|-----------|--------|-------------|
| 01 Static Task Display | 83.2% | Yes |
| 02 Dynamic Task Rendering | 81.7% | Yes |
| 03 Adding New Tasks | 81.7% | Yes |
| 04 Task Completion Toggle | 82.5% | Yes |

(E2E did not run in this environment; functional tests, code quality, and architecture all passed.)

**Conclusion:** The READMEs are good enough for a beginner to understand and pass each challenge. A few small clarifications would make the path even clearer.

---

## What worked well

1. **Challenge 01** – Clear: create TaskCard (props, `article#task-card`, `h2`/`p`), TaskList (3 hardcoded cards, `section#task-list`), export `Task`, add exports to `index.ts`. The “Wire into the app” section correctly explains that App imports from `./components` and the route renders `<TaskList />`.

2. **Challenge 02** – “Update TaskList to accept `tasks` prop and use `map()`” plus “TaskApp passes `tasks` and `countText`” was enough to implement it. The wiring note (don’t change App; TaskApp passes props) was helpful.

3. **Challenge 03** – Step-by-step (TaskForm, controlled inputs, submit, validation, `id="task-title"`, `id="task-form-error"`) was enough. “How it works” (TaskApp passes `onAddTask`) made the integration clear.

4. **Challenge 04** – “TaskCard: `completed` and `onToggle`; checkbox; strike-through and `data-completed`” and “TaskList passes them through and shows X of Y completed” were sufficient. Wiring (TaskApp passes `onToggle` and `completed` to TaskList) was clear.

5. **IDs and copy** – Saying to use “Task One”, “Task Two”, “Task Three”, “First hardcoded task”, “Priority: High”, and “First Task” / “Second Task” (etc.) in the READMEs avoided guesswork and matched the tests.

---

## Gaps / suggestions for beginners

1. **Challenge 02 – When `tasks` is not passed**  
   The README doesn’t say what to do when TaskList is used with no `tasks` prop (Challenge 1 route: `<TaskList />`). A beginner might drop the hardcoded list and break Ch1.  
   **Suggestion:** Add one line: “When no `tasks` prop is passed (e.g. on the Challenge 1 route), keep showing your 3 hardcoded TaskCards so that route still works.”

2. **Challenge 02 – App doesn’t build until TaskForm exists**  
   TaskApp imports TaskForm. So when a learner only has TaskCard and TaskList (after Ch1), the app fails to build as soon as they open or run the Ch2 route, because TaskForm is missing.  
   **Suggestion:** In Challenge 02 or 03, add a short note: “TaskApp already imports TaskForm. The app won’t build until TaskForm exists. In Challenge 3 you’ll create it; until then you can add a minimal `TaskForm.tsx` (e.g. `export default function TaskForm() { return null; }`) and export it from `index.ts` so the app builds while you work on Challenge 2.”

3. **Challenge 01 – Styling**  
   “Basic CSS: cards with borders and spacing” is vague. I didn’t add any CSS and still passed (tests don’t check styling). Optional: give a one-line example (“e.g. add a border and padding to `#task-card`”) so beginners know it’s minimal.

4. **Optional – Order of creation**  
   A single sentence at the top of Challenge 01 could help: “Create TaskCard first, then TaskList, then add both exports to `index.ts`.” Not required to pass, but reduces “where do I start?” for true beginners.

---

## Summary

- **READMEs are sufficient** for a beginner to solve and pass all four challenges using only the challenge READMEs.
- **Improvements:** (1) Ch2: clarify behavior when `tasks` is not passed; (2) Ch2 or Ch3: explain that TaskApp imports TaskForm and the app won’t build until TaskForm exists (and suggest a stub if they do Ch2 first); (3) optional: slightly clarify “basic styling” and “create TaskCard then TaskList” in Ch1.
