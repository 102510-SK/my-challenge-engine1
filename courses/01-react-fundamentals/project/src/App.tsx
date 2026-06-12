import './App.css'
import { useReducer, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChallengeList from './components/ChallengeList'
import TaskList from './components/TaskList'
import TaskApp from './components/TaskApp'
import TaskDetailPage from './components/TaskDetailPage'
import FetchDemoView from './components/FetchDemoView'
import { ThemeProvider } from './contexts/ThemeContext'
import { taskReducer, setTasks } from './reducers/taskReducer'
import type { Task } from './reducers/taskReducer'

const STORAGE_KEY = 'task-app-tasks'

const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'First Task', description: 'Description one', priority: 'High', completed: false },
  { id: 2, title: 'Second Task', description: 'Description two', priority: 'Medium', completed: false },
  { id: 3, title: 'Third Task', description: 'Description three', priority: 'Low', completed: false },
  { id: 4, title: 'Fourth Task', description: 'Description four', priority: 'Medium', completed: false },
  { id: 5, title: 'Fifth Task', description: 'Description five', priority: 'High', completed: false },
]

function getInitialTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) return parsed as Task[]
    }
  } catch { /* ignore */ }
  return INITIAL_TASKS
}

function AppContent() {
  const [tasks, dispatch] = useReducer(taskReducer, undefined, getInitialTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const setTasksFromStorage = (t: Task[]) => dispatch(setTasks(t))

  const handleDelete = (id: string | number) => {
    if (window.confirm('Are you sure?')) {
      dispatch({ type: 'DELETE_TASK', payload: id })
    }
  }

  // setTasks shim so TaskApp can still call setTasks(fn) or setTasks(arr)
  const setTasksShim: React.Dispatch<React.SetStateAction<Task[]>> = (value) => {
    if (typeof value === 'function') {
      dispatch(setTasks(value(tasks)))
    } else {
      dispatch(setTasks(value))
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<ChallengeList />} />
            <Route path="/challenge/01-static-task-display" element={<TaskList />} />
            <Route path="/challenge/02-dynamic-task-rendering" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm={false} countFormat="tasks" />} />
            <Route path="/challenge/03-adding-new-tasks" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/04-task-completion-toggle" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="completed" />} />
            <Route path="/challenge/05-task-deletion" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" onDelete={handleDelete} />} />
            <Route path="/challenge/06-task-filtering" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" showFilterBar />} />
            <Route path="/challenge/07-priority-based-sorting" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" showFilterBar />} />
            <Route path="/challenge/08-task-editing" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/09-search-functionality" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" showFilterBar />} />
            <Route path="/challenge/10-useeffect-local-storage" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/11-useeffect-debounced-search" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" showFilterBar />} />
            <Route path="/challenge/12-categories-and-tags" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" showFilterBar />} />
            <Route path="/challenge/13-due-dates-and-sorting" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" showFilterBar />} />
            <Route path="/challenge/14-task-statistics-dashboard" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" showStatsPanel />} />
            <Route path="/challenge/15-component-organization" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/16-context-api-theme" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/17-custom-hook-uselocalstorage" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/18-usereducer-complex-state" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/19-performance-optimization" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/20-error-boundaries" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" />} />
            <Route path="/challenge/21-react-router" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" linkToTaskDetail />} />
            <Route path="/challenge/21-react-router/task/:id" element={<TaskDetailPage />} />
            <Route path="/challenge/22-data-fetching" element={<FetchDemoView />} />
            <Route path="/challenge/23-useref-focus-management" element={<TaskApp tasks={tasks} setTasks={setTasksShim} dispatch={dispatch} showForm countFormat="tasks" showFilterBar />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App