import { useState, useEffect } from 'react'
import Button from './Button'
import Badge from './Badge'
import StatusIndicator from './StatusIndicator'

interface TaskCardProps {
  id?: number | string
  title: string
  description: string
  priority: string
  completed?: boolean
  category?: string
  tags?: string[]
  dueDate?: string
  onToggle?: () => void
  onDelete?: (id: number | string) => void
  onUpdateTask?: (id: number | string, updates: {
    title: string; description: string; priority: string
    category?: string; tags?: string[]; dueDate?: string
  }) => void
  isEditing?: boolean
  onEditStart?: () => void
  onEditCancel?: () => void
}

function getDueDateStatus(dueDate: string, completed: boolean): 'overdue' | 'due-today' | 'due-soon' | null {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const due = new Date(dueDate); due.setHours(0, 0, 0, 0)
  const diff = Math.round((due.getTime() - today.getTime()) / 86400000)
  if (!completed && diff < 0) return 'overdue'
  if (diff === 0) return 'due-today'
  if (diff > 0 && diff <= 3) return 'due-soon'
  return null
}

export default function TaskCard({
  id, title, description, priority, completed, category, tags, dueDate,
  onToggle, onDelete, onUpdateTask, isEditing, onEditStart, onEditCancel
}: TaskCardProps) {
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)
  const [editPriority, setEditPriority] = useState(priority)
  const [editCategory, setEditCategory] = useState(category ?? 'General')
  const [editTags, setEditTags] = useState(tags?.join(', ') ?? '')
  const [editDueDate, setEditDueDate] = useState(dueDate ?? '')
  const [editError, setEditError] = useState('')

  useEffect(() => {
    if (isEditing) {
      setEditTitle(title); setEditDescription(description); setEditPriority(priority)
      setEditCategory(category ?? 'General'); setEditTags(tags?.join(', ') ?? '')
      setEditDueDate(dueDate ?? ''); setEditError('')
    }
  }, [isEditing, title, description, priority, category, tags, dueDate])

  function handleSave() {
    if (!editTitle.trim()) { setEditError('Title is required'); return }
    onUpdateTask?.(id!, {
      title: editTitle.trim(), description: editDescription.trim(),
      priority: editPriority, category: editCategory,
      tags: editTags.split(',').map(t => t.trim()).filter(Boolean),
      dueDate: editDueDate || undefined,
    })
  }

  function handleDelete() {
    if (window.confirm('Are you sure?') && id !== undefined) onDelete?.(id)
  }

  const dueDateStatus = dueDate ? getDueDateStatus(dueDate, completed ?? false) : null
  const isOverdue = dueDateStatus === 'overdue'

  if (isEditing) {
    return (
      <article id="task-card" data-completed={completed ? 'true' : 'false'}>
        {editError && <p>{editError}</p>}
        <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
        <input type="text" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
        <select value={editPriority} onChange={e => setEditPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select value={editCategory} onChange={e => setEditCategory(e.target.value)}>
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <input type="text" placeholder="Tags (comma-separated)" value={editTags} onChange={e => setEditTags(e.target.value)} />
        <input type="date" value={editDueDate} onChange={e => setEditDueDate(e.target.value)} />
        <Button onClick={handleSave} variant="primary">Save</Button>
        <Button onClick={onEditCancel} variant="secondary">Cancel</Button>
      </article>
    )
  }

  return (
    <article id="task-card" data-completed={completed ? 'true' : 'false'} data-overdue={isOverdue ? 'true' : 'false'}
      style={{ background: completed ? '#f0f0f0' : isOverdue ? '#fff0f0' : '#fff' }}>
      {onToggle && <input type="checkbox" checked={completed ?? false} onChange={onToggle} />}
      <h2 style={{ textDecoration: completed ? 'line-through' : 'none' }}>{title}</h2>
      <p style={{ textDecoration: completed ? 'line-through' : 'none' }}>{description}</p>
      <Badge variant="priority">Priority: {priority}</Badge>
      {category && <Badge variant="category" ><span id="task-category">{category}</span></Badge>}
      {tags && tags.length > 0 && (
        <div id="task-tags">
          {tags.map(tag => <Badge key={tag} variant="tag"><span data-tag={tag}>{tag}</span></Badge>)}
        </div>
      )}
      {dueDate && (
        <div id="task-due-date">
          <span>{new Date(dueDate).toLocaleDateString()}</span>
          {dueDateStatus && <StatusIndicator status={dueDateStatus} />}
        </div>
      )}
      {onEditStart && <Button onClick={onEditStart} variant="secondary">Edit</Button>}
      {onDelete && <Button onClick={handleDelete} variant="danger">Delete</Button>}
    </article>
  )
}