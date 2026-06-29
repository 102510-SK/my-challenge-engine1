import { useState, useEffect, useCallback, useMemo } from 'react'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import FilterBar from './FilterBar'
import StatsPanel from './StatsPanel'
import ThemeToggle from './ThemeToggle'
import ErrorBoundary from './ErrorBoundary'
import type { Action, Task } from '../reducers/taskReducer'
import { addTask, updateTask, deleteTask, toggleTask } from '../reducers/taskReducer'

type Filter = 'all' | 'active' | 'completed'
type SortOrder = 'recently-added' | 'priority-high-low' | 'priority-low-high' | 'alphabetical' | 'due-date'

interface TaskAppProps {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  dispatch?: React.Dispatch<Action>
  showForm?: boolean
  countFormat?: string
  countText?: string
  onDelete?: (id: number | string) => void
  showFilterBar?: boolean
  showStatsPanel?: boolean
  linkToTaskDetail?: boolean
}

const PRIORITY_RANK: Record<string, number> = { High: 3, Medium: 2, Low: 1 }

export default function TaskApp({ tasks, setTasks, dispatch, showForm, countFormat, countText, onDelete, showFilterBar, showStatsPanel }: TaskAppProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const [sort, setSort] = useState<SortOrder>('recently-added')
  const [editingId, setEditingId] = useState<number | string | null>(null)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    if (search !== debouncedSearch) setSearching(true)
    const timeout = setTimeout(() => { setDebouncedSearch(search); setSearching(false) }, 300)
    return () => clearTimeout(timeout)
  }, [search])

  const handleAddTask = useCallback((task: Task) => {
    if (dispatch) { dispatch(addTask(task)) } else { setTasks(prev => [...prev, task]) }
  }, [dispatch, setTasks])

  const handleToggle = useCallback((id: number | string) => {
    if (dispatch) { dispatch(toggleTask(id)) } else {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
    }
  }, [dispatch, setTasks])

  const handleDelete = useCallback((id: number | string) => {
    if (onDelete) { onDelete(id) }
    else if (dispatch) { dispatch(deleteTask(id)) }
    else { setTasks(prev => prev.filter(t => t.id !== id)) }
  }, [onDelete, dispatch, setTasks])

  const handleUpdateTask = useCallback((id: number | string, updates: Partial<Task>) => {
    if (dispatch) { dispatch(updateTask(id, updates)) } else {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
    }
    setEditingId(null)
  }, [dispatch, setTasks])

  const categories = useMemo(
    () => [...new Set(tasks.map(t => t.category).filter(Boolean))] as string[],
    [tasks]
  )

  const sortedTasks = useMemo(() => {
    const filtered = tasks
      .filter(t => { if (filter === 'active') return !t.completed; if (filter === 'completed') return t.completed; return true })
      .filter(t => !selectedCategory || t.category === selectedCategory)
      .filter(t => {
        if (!debouncedSearch.trim()) return true
        const q = debouncedSearch.toLowerCase()
        return t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      })

    return [...filtered].sort((a, b) => {
      if (sort === 'priority-high-low') return (PRIORITY_RANK[b.priority] ?? 0) - (PRIORITY_RANK[a.priority] ?? 0)
      if (sort === 'priority-low-high') return (PRIORITY_RANK[a.priority] ?? 0) - (PRIORITY_RANK[b.priority] ?? 0)
      if (sort === 'alphabetical') return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      if (sort === 'due-date') {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }
      return 0
    })
  }, [tasks, filter, selectedCategory, debouncedSearch, sort])

  const computedCountText = useMemo(() => {
    if (countText) return countText
    if (countFormat === 'completed') return `${tasks.filter(t => t.completed).length} of ${tasks.length} completed`
    return `Showing ${sortedTasks.length} of ${tasks.length} tasks`
  }, [countText, countFormat, tasks, sortedTasks.length])

  const handleClearSearch = useCallback(() => { setSearch(''); setDebouncedSearch('') }, [])

  return (
    <div>
      <ThemeToggle />
      {showStatsPanel && <StatsPanel tasks={tasks} />}
      {showFilterBar && (
        <FilterBar
          filter={filter} onFilterChange={setFilter}
          sort={sort} onSortChange={setSort}
          search={search} onSearchChange={setSearch}
          onClearSearch={handleClearSearch}
          categories={categories} selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}
      {searching && <p id="searching-indicator">Searching...</p>}
      {showForm && <TaskForm onAddTask={handleAddTask} categories={categories} />}
      <ErrorBoundary>
        <TaskList
          tasks={sortedTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdateTask={handleUpdateTask}
          editingId={editingId}
          setEditingId={setEditingId}
          countText={computedCountText}
        />
      </ErrorBoundary>
      {sortedTasks.length === 0 && !searching && (
        <p id="filter-empty-message">
          {search ? `No tasks found for '${search}'` : 'No tasks match this filter'}
        </p>
      )}
    </div>
  )
}