import { useParams, useNavigate } from 'react-router-dom'

interface Task {
  id: number | string
  title: string
  description: string
  priority: string
  completed: boolean
  category?: string
  tags?: string[]
  dueDate?: string
}

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  let task: Task | undefined
  try {
    const stored = localStorage.getItem('task-app-tasks')
    if (stored) {
      const tasks = JSON.parse(stored) as Task[]
      task = tasks.find(t => String(t.id) === String(id))
    }
  } catch { /* ignore */ }

  if (!task) {
    return (
      <div id="task-detail-page">
        <p>Task not found.</p>
        <button id="task-detail-back" onClick={() => navigate('/challenge/21-react-router')}>
          Back to list
        </button>
      </div>
    )
  }

  return (
    <div id="task-detail-page">
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.completed ? 'Completed' : 'Active'}</p>
      {task.category && <p>Category: {task.category}</p>}
      {task.tags && task.tags.length > 0 && <p>Tags: {task.tags.join(', ')}</p>}
      {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
      <button id="task-detail-back" onClick={() => navigate('/challenge/21-react-router')}>
        Back to list
      </button>
    </div>
  )
}