import { useState } from 'react'
import FormInput from './FormInput'
import Button from './Button'

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
      <FormInput id="task-title" label="Title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <FormInput id="task-description" label="Description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
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
      <FormInput id="task-tags" label="Tags" value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma-separated)" />
      <FormInput id="task-due-date" label="Due Date" value={dueDate} onChange={e => setDueDate(e.target.value)} type="date" />
      <Button type="submit" variant="primary">Add Task</Button>
    </form>
  )
}