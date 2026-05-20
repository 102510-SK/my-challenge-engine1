type Status = 'overdue' | 'due-today' | 'due-soon' | 'completed'

interface StatusIndicatorProps {
  status: Status
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const config: Record<Status, { label: string; color: string }> = {
    overdue: { label: 'Overdue', color: 'red' },
    'due-today': { label: 'Due Today', color: 'orange' },
    'due-soon': { label: 'Due Soon', color: '#f9a825' },
    completed: { label: 'Completed', color: 'green' },
  }
  const { label, color } = config[status]
  return <span style={{ color, fontWeight: 600, fontSize: '0.8rem', marginLeft: '8px' }}>{label}</span>
}