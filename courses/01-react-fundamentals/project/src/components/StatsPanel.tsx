import { useMemo } from 'react'

interface Task {
  id: number | string
  title: string
  description: string
  priority: string
  completed: boolean
  category?: string
  tags?: string[]
  dueDate?: string
}

interface StatsPanelProps {
  tasks?: Task[]
  total?: number
  completed?: number
  active?: number
  overdue?: number
}

export default function StatsPanel({ tasks = [], total, completed, active, overdue }: StatsPanelProps) {
  const stats = useMemo(() => {
    if (total !== undefined) {
      return {
        total: total ?? 0,
        completed: completed ?? 0,
        active: active ?? 0,
        overdue: overdue ?? 0,
        completedPct: total > 0 ? Math.round(((completed ?? 0) / total) * 100) : 0,
        byCategory: {} as Record<string, number>,
        byPriority: {} as Record<string, number>,
      }
    }

    const t = tasks.length
    const comp = tasks.filter(t => t.completed).length
    const act = tasks.filter(t => !t.completed).length
    const completedPct = t > 0 ? Math.round((comp / t) * 100) : 0

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const ovd = tasks.filter(task => {
      if (task.completed || !task.dueDate) return false
      return new Date(task.dueDate) < today
    }).length

    const byCategory: Record<string, number> = {}
    tasks.forEach(task => {
      const cat = task.category ?? 'General'
      byCategory[cat] = (byCategory[cat] ?? 0) + 1
    })

    const byPriority: Record<string, number> = {}
    tasks.forEach(task => {
      byPriority[task.priority] = (byPriority[task.priority] ?? 0) + 1
    })

    return { total: t, completed: comp, active: act, completedPct, overdue: ovd, byCategory, byPriority }
  }, [tasks, total, completed, active, overdue])

  return (
    <div id="stats-panel">
      <h2>Task Statistics</h2>
      <div id="stats-total">Total: {stats.total}</div>
      <div id="stats-completed">Completed: {stats.completed} ({stats.completedPct}%)</div>
      <div id="stats-active">Active: {stats.active}</div>
      <div id="stats-overdue">Overdue: {stats.overdue}</div>
      <div style={{ margin: '0.5rem 0' }}>
        <div
          role="progressbar"
          aria-valuenow={stats.completedPct}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ height: '12px', background: '#e0e0e0', borderRadius: '6px', overflow: 'hidden' }}
        >
          <div style={{ width: `${stats.completedPct}%`, height: '100%', background: '#4caf50' }} />
        </div>
      </div>
      <div id="stats-by-priority">
        <strong>By Priority:</strong>
        {Object.entries(stats.byPriority).map(([p, count]) => (
          <span key={p} style={{ marginLeft: '8px' }}>{p}: {count}</span>
        ))}
      </div>
      <div id="stats-by-category">
        <strong>By Category:</strong>
        {Object.entries(stats.byCategory).map(([c, count]) => (
          <span key={c} style={{ marginLeft: '8px' }}>{c}: {count}</span>
        ))}
      </div>
    </div>
  )
}