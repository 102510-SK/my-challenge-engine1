import TaskCard from './TaskCard'

export interface Task {
  id: number | string
  title: string
  description: string
  priority: string
  completed: boolean
}

interface TaskListProps {
  tasks?: Task[]
  onToggle?: (id: number | string) => void
  onDelete?: (id: number | string) => void
  onUpdateTask?: (id: number | string, updates: Partial<Task>) => void
  editingId?: number | string | null
  setEditingId?: React.Dispatch<React.SetStateAction<number | string | null>>
  countFormat?: string
}

export default function TaskList({ tasks, onToggle, countFormat }: TaskListProps) {
  if (!tasks) {
    return (
      <section id="task-list">
        <TaskCard title="Task One" description="First hardcoded task" priority="High" />
        <TaskCard title="Task Two" description="Second hardcoded task" priority="Medium" />
        <TaskCard title="Task Three" description="Third hardcoded task" priority="Low" />
      </section>
    )
  }

  const completedCount = tasks.filter(t => t.completed).length

  return (
    <section id="task-list">
      <div id="task-count">
        {countFormat === 'tasks'
          ? `Tasks: ${tasks.length}`
          : `${completedCount} of ${tasks.length} completed`}
      </div>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          completed={task.completed}
          onToggle={onToggle ? () => onToggle(task.id) : undefined}
        />
      ))}
    </section>
  )
}