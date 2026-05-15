interface TaskCardProps {
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
}

export default function TaskCard({ title, description, priority }: TaskCardProps) {
  return (
    <article id="task-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <span>Priority: {priority}</span>
    </article>
  )
}