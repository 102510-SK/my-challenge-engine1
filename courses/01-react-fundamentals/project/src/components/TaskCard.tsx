interface TaskCardProps {
  id?: number | string
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: () => void
  onDelete?: (id: number | string) => void
}

export default function TaskCard({ id, title, description, priority, completed, onToggle, onDelete }: TaskCardProps) {
  function handleDelete() {
    if (window.confirm('Are you sure?') && id !== undefined) {
      onDelete?.(id)
    }
  }

  return (
    <article id="task-card" data-completed={completed ? 'true' : 'false'} style={{ background: completed ? '#f0f0f0' : '#fff' }}>
      {onToggle && (
        <input type="checkbox" checked={completed ?? false} onChange={onToggle} />
      )}
      <h2 style={{ textDecoration: completed ? 'line-through' : 'none' }}>{title}</h2>
      <p style={{ textDecoration: completed ? 'line-through' : 'none' }}>{description}</p>
      <span>Priority: {priority}</span>
      {onDelete && <button onClick={handleDelete}>Delete</button>}
    </article>
  )
}