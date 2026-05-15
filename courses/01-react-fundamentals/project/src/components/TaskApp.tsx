import { useState } from 'react'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import FilterBar from './FilterBar'

type Filter = 'all' | 'active' | 'completed'

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

export default function TaskApp({ tasks, setTasks, showForm, countFormat, countText, onDelete, showFilterBar }: TaskAppProps) {
  const [filter, setFilter] = useState<Filter>('all')

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

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
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
        <FilterBar filter={filter} onFilterChange={setFilter} />
      )}
      {showForm && <TaskForm onAddTask={handleAddTask} />}
      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        countText={computedCountText}
      />
      {filteredTasks.length === 0 && (
        <p id="filter-empty-message">No tasks match this filter</p>
      )}
    </div>
  )
}