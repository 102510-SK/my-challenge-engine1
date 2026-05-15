import { useState } from 'react'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import FilterBar from './FilterBar'

type Filter = 'all' | 'active' | 'completed'
type SortOrder = 'recently-added' | 'priority-high-low' | 'priority-low-high' | 'alphabetical'

interface Task {
  id: number | string
  title: string
  description: string
  priority: string
  completed: boolean
}

interface TaskAppProps {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  showForm?: boolean
  countFormat?: string
  countText?: string
  onDelete?: (id: number | string) => void
  showFilterBar?: boolean
  showStatsPanel?: boolean
  linkToTaskDetail?: boolean
}

const PRIORITY_RANK: Record<string, number> = { High: 3, Medium: 2, Low: 1 }

export default function TaskApp({ tasks, setTasks, showForm, countFormat, countText, onDelete, showFilterBar }: TaskAppProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const [sort, setSort] = useState<SortOrder>('recently-added')
  const [editingId, setEditingId] = useState<number | string | null>(null)

  function handleAddTask(task: Task) {
    setTasks(prev => [...prev, task])
  }

  function handleToggle(id: number | string) {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    )
  }

  function handleDelete(id: number | string) {
    if (onDelete) {
      onDelete(id)
    } else {
      setTasks(prev => prev.filter(t => t.id !== id))
    }
  }

  function handleUpdateTask(id: number | string, updates: Partial<Task>) {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, ...updates } : t)
    )
    setEditingId(null)
  }

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'priority-high-low') return (PRIORITY_RANK[b.priority] ?? 0) - (PRIORITY_RANK[a.priority] ?? 0)
    if (sort === 'priority-low-high') return (PRIORITY_RANK[a.priority] ?? 0) - (PRIORITY_RANK[b.priority] ?? 0)
    if (sort === 'alphabetical') return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    return 0
  })

  const computedCountText = countText
    ? countText
    : countFormat === 'completed'
    ? `${tasks.filter(t => t.completed).length} of ${tasks.length} completed`
    : showFilterBar
    ? `Showing ${filteredTasks.length} of ${tasks.length} tasks`
    : `Tasks: ${tasks.length}`

  return (
    <div>
      {showFilterBar && (
        <FilterBar filter={filter} onFilterChange={setFilter} sort={sort} onSortChange={setSort} />
      )}
      {showForm && <TaskForm onAddTask={handleAddTask} />}
      <TaskList
        tasks={sortedTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onUpdateTask={handleUpdateTask}
        editingId={editingId}
        setEditingId={setEditingId}
        countText={computedCountText}
      />
      {sortedTasks.length === 0 && (
        <p id="filter-empty-message">No tasks match this filter</p>
      )}
    </div>
  )
}