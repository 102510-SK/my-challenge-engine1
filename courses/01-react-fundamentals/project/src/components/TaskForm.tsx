import { useState } from 'react'

interface Task {
  id: number | string
  title: string
  description: string
  priority: string
  completed: boolean
}

interface TaskFormProps {
  onAddTask: (task: Task) => void
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    setError('')
    onAddTask({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
    })
    setTitle('')
    setDescription('')
    setPriority('Medium')
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p id="task-form-error">{error}</p>}
      <label htmlFor="task-title">Title</label>
      <input
        id="task-title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <label htmlFor="task-description">Description</label>
      <input
        id="task-description"
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <label htmlFor="task-priority">Priority</label>
      <select
        id="task-priority"
        value={priority}
        onChange={e => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  )
}