import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from '../src/components/TaskForm';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Challenge 03: Adding New Tasks', () => {
  it('should have controlled title input', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TaskForm onAddTask={onAdd} />);
    const titleInput = screen.getByLabelText(/Title/i) || screen.getByPlaceholderText(/Task title/i) || document.getElementById('task-title');
    expect(titleInput).toBeInTheDocument();
    await act(async () => {
      await user.type(titleInput as HTMLElement, 'New Task');
    });
    expect((titleInput as HTMLInputElement).value).toBe('New Task');
  });

  it('should have Add Task submit button', () => {
    render(<TaskForm onAddTask={vi.fn()} />);
    expect(screen.getByRole('button', { name: /Add Task/i })).toBeInTheDocument();
  });

  it('should call onAddTask with new task when title filled and submitted', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TaskForm onAddTask={onAdd} />);
    const titleInput = document.getElementById('task-title') || screen.getByPlaceholderText(/Task title/i);
    await act(async () => {
      await user.type(titleInput as HTMLElement, 'My Task');
      await user.click(screen.getByRole('button', { name: /Add Task/i }));
    });
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'My Task',
        completed: false,
      })
    );
    const id = (onAdd.mock.calls[0][0] as { id: unknown }).id;
    expect(id !== undefined && id !== null).toBe(true);
    expect(['string', 'number']).toContain(typeof id);
  });

  it('should show error when title is empty on submit', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TaskForm onAddTask={onAdd} />);
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /Add Task/i }));
    });
    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    expect(document.getElementById('task-form-error')).toBeInTheDocument();
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('should clear form after successful add', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TaskForm onAddTask={onAdd} />);
    const titleInput = document.getElementById('task-title');
    await act(async () => {
      await user.type(titleInput as HTMLElement, 'Task');
      await user.click(screen.getByRole('button', { name: /Add Task/i }));
    });
    expect((titleInput as HTMLInputElement).value).toBe('');
  });

  it('should use controlled inputs (value + onChange)', () => {
    const formContent = readFileSync(
      join(__dirname, '../src/components/TaskForm.tsx'),
      'utf-8'
    );
    expect(formContent).toContain('value=');
    expect(formContent).toContain('onChange');
  });
});
