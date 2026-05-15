import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from '../src/components/FilterBar';
import TaskList from '../src/components/TaskList';

describe('Challenge 06: Task Filtering', () => {
  const TASKS = [
    { id: 1, title: 'A', description: 'D1', priority: 'High', completed: false },
    { id: 2, title: 'B', description: 'D2', priority: 'Medium', completed: true },
    { id: 3, title: 'C', description: 'D3', priority: 'Low', completed: false },
  ];

  it('FilterBar should render All, Active, Completed buttons', () => {
    render(<FilterBar filter="all" onFilterChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /active/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
  });

  it('FilterBar should have id="filter-bar"', () => {
    const { container } = render(<FilterBar filter="all" />);
    expect(container.querySelector('#filter-bar')).toBeInTheDocument();
  });

  it('FilterBar should highlight active filter', () => {
    render(<FilterBar filter="active" onFilterChange={vi.fn()} />);
    const activeBtn = screen.getByRole('button', { name: /active/i });
    expect(activeBtn).toHaveAttribute('data-active', 'true');
  });

  it('FilterBar should call onFilterChange when button clicked', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    render(<FilterBar filter="all" onFilterChange={onFilterChange} />);
    await user.click(screen.getByRole('button', { name: /completed/i }));
    expect(onFilterChange).toHaveBeenCalledWith('completed');
  });

  it('TaskList with filtered tasks should show only matching tasks', () => {
    const activeOnly = TASKS.filter((t) => !t.completed);
    render(<TaskList tasks={activeOnly} countText="Showing 2 of 3 tasks" />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.queryByText('B')).not.toBeInTheDocument();
    expect(document.getElementById('task-count')).toHaveTextContent(/2 of 3/);
  });
});
