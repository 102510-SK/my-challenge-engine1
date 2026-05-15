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
  countText?: string
  onDelete?: (id: number | string) => void
  showFilterBar?: boolean
  showStatsPanel?: boolean
  linkToTaskDetail?: boolean
}

export default function TaskApp({ tasks, setTasks, showForm, countFormat, countText, onDelete }: TaskAppProps) {
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

  return (
    <div>
      {showForm && <TaskForm onAddTask={handleAddTask} />}
      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        countFormat={countFormat}
        countText={countText}
      />
    </div>
  )
}