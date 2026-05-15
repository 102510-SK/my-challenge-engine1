import { useState, useEffect } from 'react'

interface TaskCardProps {
  id?: number | string
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: () => void
  onDelete?: (id: number | string) => void
  onUpdateTask?: (id: number | string, updates: { title: string; description: string; priority: string }) => void
  isEditing?: boolean
  onEditStart?: () => void
  onEditCancel?: () => void
}

export default function TaskCard({
  id, title, description, priority, completed,
  onToggle, onDelete, onUpdateTask, isEditing, onEditStart, onEditCancel
}: TaskCardProps) {
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)
  const [editPriority, setEditPriority] = useState(priority)
  const [editError, setEditError] = useState('')

  useEffect(() => {
    if (isEditing) {
      setEditTitle(title)
      setEditDescription(description)
      setEditPriority(priority)
      setEditError('')
    }
  }, [isEditing, title, description, priority])

  function handleSave() {
    if (!editTitle.trim()) {
      setEditError('Title is required')
      return
    }
    onUpdateTask?.(id!, { title: editTitle.trim(), description: editDescription.trim(), priority: editPriority })
  }

  function handleDelete() {
    if (window.confirm('Are you sure?') && id !== undefined) {
      onDelete?.(id)
    }
  }

  if (isEditing) {
    return (
      <article id="task-card" data-completed={completed ? 'true' : 'false'}>
        {editError && <p>{editError}</p>}
        <input
          type="text"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
        />
        <input
          type="text"
          value={editDescription}
          onChange={e => setEditDescription(e.target.value)}
        />
        <select value={editPriority} onChange={e => setEditPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={handleSave}>Save</button>
        <button onClick={onEditCancel}>Cancel</button>
      </article>
    )
  }

  return (
    <article id="task-card" data-completed={completed ? 'true' : 'false'} style={{ background: completed ? '#f0f0f0' : '#fff' }}>
      {onToggle && (
        <input type="checkbox" checked={completed ?? false} onChange={onToggle} />
      )}
      <h2 style={{ textDecoration: completed ? 'line-through' : 'none' }}>{title}</h2>
      <p style={{ textDecoration: completed ? 'line-through' : 'none' }}>{description}</p>
      <span>Priority: {priority}</span>
      {onEditStart && <button onClick={onEditStart}>Edit</button>}
      {onDelete && <button onClick={handleDelete}>Delete</button>}
    </article>
  )
}