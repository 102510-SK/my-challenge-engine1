import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskCard from '../src/components/TaskCard';
import TaskList from '../src/components/TaskList';

describe('Challenge 19: Performance Optimization', () => {
  const TASKS = [{ id: 1, title: 'T', description: 'D', priority: 'High', completed: false }];

  it('TaskCard should render', () => {
    render(<TaskCard title="T" description="D" priority="High" />);
    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('TaskList should render TaskCards', () => {
    render(<TaskList tasks={TASKS} countText="1 Tasks" />);
    expect(screen.getByText('T')).toBeInTheDocument();
  });
});
