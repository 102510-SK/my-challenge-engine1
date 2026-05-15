import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskCard from '../src/components/TaskCard';
import TaskList from '../src/components/TaskList';

describe('Challenge 05: Task Deletion', () => {
  const TASKS = [
    { id: 1, title: 'Task 1', description: 'D1', priority: 'High', completed: false },
    { id: 2, title: 'Task 2', description: 'D2', priority: 'Medium', completed: false },
  ];

  beforeEach(() => {
    vi.stubGlobal('confirm', vi.fn());
  });

  it('TaskCard should render Delete button when onDelete and id provided', () => {
    const onDelete = vi.fn();
    render(
      <TaskCard id={1} title="T" description="D" priority="Low" onDelete={onDelete} />
    );
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    expect(deleteBtn).toBeInTheDocument();
  });

  it('TaskCard should not render Delete button when onDelete not provided', () => {
    render(<TaskCard id={1} title="T" description="D" priority="Low" />);
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
  });

  it('TaskCard should call onDelete when Delete clicked and user confirms', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    (window.confirm as ReturnType<typeof vi.fn>).mockReturnValue(true);
    render(
      <TaskCard id={1} title="T" description="D" priority="Low" onDelete={onDelete} />
    );
    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(window.confirm).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it('TaskCard should not call onDelete when user cancels confirmation', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    (window.confirm as ReturnType<typeof vi.fn>).mockReturnValue(false);
    render(
      <TaskCard id={2} title="T" description="D" priority="Low" onDelete={onDelete} />
    );
    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(window.confirm).toHaveBeenCalled();
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('TaskList should pass onDelete to TaskCard when provided', () => {
    const onDelete = vi.fn();
    render(
      <TaskList tasks={TASKS} onDelete={onDelete} countText="2 Tasks" />
    );
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    expect(deleteButtons.length).toBe(2);
  });

  it('TaskList should show countText in #task-count', () => {
    render(<TaskList tasks={TASKS} onDelete={vi.fn()} countText="2 Tasks" />);
    expect(document.getElementById('task-count')).toHaveTextContent('2 Tasks');
  });
});
