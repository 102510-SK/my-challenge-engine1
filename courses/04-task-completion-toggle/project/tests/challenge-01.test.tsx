import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskCard from '../src/components/TaskCard';
import TaskList from '../src/components/TaskList';

describe('Challenge 01: Static Task Display', () => {
  describe('TaskCard', () => {
    it('should render title, description, and priority', () => {
      render(
        <TaskCard title="Test Task" description="Test description" priority="High" />
      );
      expect(screen.getByText('Test Task')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByText(/Priority: High/)).toBeInTheDocument();
    });

    it('should use article with id task-card', () => {
      const { container } = render(
        <TaskCard title="T" description="D" priority="Low" />
      );
      const article = container.querySelector('#task-card');
      expect(article).toBeInTheDocument();
      expect(article?.tagName.toLowerCase()).toBe('article');
    });

    it('should use semantic HTML (h2 for title)', () => {
      const { container } = render(
        <TaskCard title="Title" description="Desc" priority="Medium" />
      );
      const h2 = container.querySelector('h2');
      expect(h2).toHaveTextContent('Title');
    });
  });

  describe('TaskList', () => {
    it('should render 3 TaskCards when no tasks prop', () => {
      const { container } = render(<TaskList />);
      const cards = container.querySelectorAll('#task-card');
      expect(cards.length).toBe(3);
    });

    it('should have section with id task-list', () => {
      const { container } = render(<TaskList />);
      const section = container.querySelector('#task-list');
      expect(section).toBeInTheDocument();
      expect(section?.tagName.toLowerCase()).toBe('section');
    });

    it('should display three different tasks', () => {
      render(<TaskList />);
      expect(screen.getByText('Task One')).toBeInTheDocument();
      expect(screen.getByText('Task Two')).toBeInTheDocument();
      expect(screen.getByText('Task Three')).toBeInTheDocument();
    });
  });
});
