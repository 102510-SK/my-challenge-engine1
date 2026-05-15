type Filter = 'all' | 'active' | 'completed'

interface FilterBarProps {
  filter: Filter
  onFilterChange: (filter: Filter) => void
}

export default function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  return (
    <div id="filter-bar">
      <button data-active={filter === 'all'} onClick={() => onFilterChange('all')}>All</button>
      <button data-active={filter === 'active'} onClick={() => onFilterChange('active')}>Active</button>
      <button data-active={filter === 'completed'} onClick={() => onFilterChange('completed')}>Completed</button>
    </div>
  )
}