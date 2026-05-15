import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../src/components/ErrorBoundary';

describe('Challenge 20: Error Boundaries and Error Handling', () => {
  it('ErrorBoundary should render children when no error', () => {
    render(
      <ErrorBoundary>
        <span>Child</span>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('ErrorBoundary should have fallback with id="error-boundary-fallback" when error caught', () => {
    const Throws = () => {
      throw new Error('test');
    };
    render(
      <ErrorBoundary>
        <Throws />
      </ErrorBoundary>
    );
    const fallback = document.getElementById('error-boundary-fallback');
    expect(fallback).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('ErrorBoundary should have Retry button with id="error-retry"', () => {
    const Throws = () => {
      throw new Error('test');
    };
    render(
      <ErrorBoundary>
        <Throws />
      </ErrorBoundary>
    );
    const retry = document.getElementById('error-retry');
    expect(retry).toBeInTheDocument();
  });

  it('Retry button should be clickable', async () => {
    const user = userEvent.setup();
    const Throws = () => {
      throw new Error('test');
    };
    render(
      <ErrorBoundary>
        <Throws />
      </ErrorBoundary>
    );
    const retry = screen.getByRole('button', { name: /retry/i });
    expect(retry).toBeInTheDocument();
    await user.click(retry);
    // After click, boundary resets; child Throws re-renders and throws again, so fallback shows again
    expect(document.getElementById('error-boundary-fallback')).toBeInTheDocument();
  });
});
