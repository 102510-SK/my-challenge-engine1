type Filter = 'all' | 'active' | 'completed'
type SortOrder = 'recently-added' | 'priority-high-low' | 'priority-low-high' | 'alphabetical'

interface FilterBarProps {
  filter: Filter
  onFilterChange?: (filter: Filter) => void
  sort?: SortOrder
  onSortChange?: (sort: SortOrder) => void
  search?: string
  onSearchChange?: (search: string) => void
  onClearSearch?: () => void
  categories?: string[]
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
}

export default function FilterBar({
  filter, onFilterChange, sort, onSortChange,
  search, onSearchChange, onClearSearch,
  categories, selectedCategory, onCategoryChange
}: FilterBarProps) {
  return (
    <div id="filter-bar">
      <button data-active={filter === 'all'} onClick={() => onFilterChange?.('all')}>All</button>
      <button data-active={filter === 'active'} onClick={() => onFilterChange?.('active')}>Active</button>
      <button data-active={filter === 'completed'} onClick={() => onFilterChange?.('completed')}>Completed</button>
      {onSortChange && (
        <select id="sort-order" value={sort} onChange={e => onSortChange(e.target.value as SortOrder)}>
          <option value="recently-added">Recently Added</option>
          <option value="priority-high-low">Priority: High to Low</option>
          <option value="priority-low-high">Priority: Low to High</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      )}
      {onCategoryChange && (
        <select id="category-filter" value={selectedCategory} onChange={e => onCategoryChange(e.target.value)}>
          <option value="">All categories</option>
          {categories?.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      )}
      {onSearchChange && (
        <input
          aria-label="search-input"
          data-testid="search-input"
          type="text"
          placeholder="Search tasks..."
          value={search ?? ''}
          onChange={e => onSearchChange(e.target.value)}
        />
      )}
      {search && (
        <button id="clear-search" onClick={onClearSearch}>Clear search</button>
      )}
    </div>
  )
}