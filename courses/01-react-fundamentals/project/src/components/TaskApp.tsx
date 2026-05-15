import { useState } from 'react'
import TaskForm from './TaskForm'
import TaskList from './TaskList'

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
  onDelete?: (id: number | string) => void
  showFilterBar?: boolean
  showStatsPanel?: boolean
  linkToTaskDetail?: boolean
}

export default function TaskApp({ tasks, setTasks, showForm }: TaskAppProps) {
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
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function handleUpdateTask(id: number | string, updates: Partial<Task>) {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, ...updates } : t)
    )
    setEditingId(null)
  }

  return (
    <div>
      <div id="task-count">Tasks: {tasks.length}</div>
      {showForm && <TaskForm onAddTask={handleAddTask} />}
      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onUpdateTask={handleUpdateTask}
        editingId={editingId}
        setEditingId={setEditingId}
      />
    </div>
  )
}