import { useState, useEffect } from 'react'

interface TaskCardProps {
  id?: number | string
  title: string
  description: string
  priority: string
  completed?: boolean
  category?: string
  tags?: string[]
  onToggle?: () => void
  onDelete?: (id: number | string) => void
  onUpdateTask?: (id: number | string, updates: {
    title: string
    description: string
    priority: string
    category?: string
    tags?: string[]
  }) => void
  isEditing?: boolean
  onEditStart?: () => void
  onEditCancel?: () => void
}

export default function TaskCard({
  id, title, description, priority, completed, category, tags,
  onToggle, onDelete, onUpdateTask, isEditing, onEditStart, onEditCancel
}: TaskCardProps) {
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)
  const [editPriority, setEditPriority] = useState(priority)
  const [editCategory, setEditCategory] = useState(category ?? 'General')
  const [editTags, setEditTags] = useState(tags?.join(', ') ?? '')
  const [editError, setEditError] = useState('')

  useEffect(() => {
    if (isEditing) {
      setEditTitle(title)
      setEditDescription(description)
      setEditPriority(priority)
      setEditCategory(category ?? 'General')
      setEditTags(tags?.join(', ') ?? '')
      setEditError('')
    }
  }, [isEditing, title, description, priority, category, tags])

  function handleSave() {
    if (!editTitle.trim()) {
      setEditError('Title is required')
      return
    }
    onUpdateTask?.(id!, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
      category: editCategory,
      tags: editTags.split(',').map(t => t.trim()).filter(Boolean),
    })
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
        <button onClick={handleSave}>Save</button>
        <button onClick={onEditCancel}>Cancel</button>
      </article>
    )
  }

  return (
    <article id="task-card" data-completed={completed ? 'true' : 'false'} style={{ background: completed ? '#f0f0f0' : '#fff' }}>
      {onToggle && <input type="checkbox" checked={completed ?? false} onChange={onToggle} />}
      <h2 style={{ textDecoration: completed ? 'line-through' : 'none' }}>{title}</h2>
      <p style={{ textDecoration: completed ? 'line-through' : 'none' }}>{description}</p>
      <span>Priority: {priority}</span>
      {category && <span id="task-category">{category}</span>}
      {tags && tags.length > 0 && (
        <div id="task-tags">
          {tags.map(tag => (
            <span key={tag} data-tag={tag} style={{ marginRight: '4px', padding: '2px 6px', background: '#e0e0e0', borderRadius: '4px' }}>{tag}</span>
          ))}
        </div>
      )}
      {onEditStart && <button onClick={onEditStart}>Edit</button>}
      {onDelete && <button onClick={handleDelete}>Delete</button>}
    </article>
  )
}