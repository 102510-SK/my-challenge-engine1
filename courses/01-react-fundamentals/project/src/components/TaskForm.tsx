import { useState } from 'react'

interface Task {
  id: number | string
  title: string
  description: string
  priority: string
  completed: boolean
  category: string
  tags: string[]
  dueDate?: string
}

interface TaskFormProps {
  onAddTask: (task: Task) => void
  categories?: string[]
}

export default function TaskForm({ onAddTask, categories = [] }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [category, setCategory] = useState('General')
  const [tags, setTags] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) { setError('Title is required'); return }
    setError('')
    onAddTask({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      dueDate: dueDate || undefined,
    })
    setTitle(''); setDescription(''); setPriority('Medium')
    setCategory('General'); setTags(''); setDueDate('')
  }

  const allCategories = [...new Set(['General', 'Work', 'Personal', ...categories])]

  return (
    <form onSubmit={handleSubmit}>
      {error && <p id="task-form-error">{error}</p>}
      <label htmlFor="task-title">Title</label>
      <input id="task-title" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <label htmlFor="task-description">Description</label>
      <input id="task-description" type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <label htmlFor="task-priority">Priority</label>
      <select id="task-priority" value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <label htmlFor="task-category">Category</label>
      <select id="task-category" value={category} onChange={e => setCategory(e.target.value)}>
        {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <label htmlFor="task-tags">Tags</label>
      <input id="task-tags" type="text" placeholder="Tags (comma-separated)" value={tags} onChange={e => setTags(e.target.value)} />
      <label htmlFor="task-due-date">Due Date</label>
      <input id="task-due-date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button type="submit">Add Task</button>
    </form>
  )
}