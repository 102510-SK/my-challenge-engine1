import { test, expect } from '@playwright/test';

test.describe('Challenge 04: Task Completion Toggle - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/challenge/04-task-completion-toggle');
  });

  test('should display task count as X of Y completed', async ({ page }) => {
    const countEl = page.locator('#task-count');
    await expect(countEl).toBeVisible();
    await expect(countEl).toContainText('completed');
  });

  test('should have checkboxes on tasks', async ({ page }) => {
    const checkboxes = page.getByRole('checkbox');
    await expect(checkboxes.first()).toBeVisible();
  });

  test('should toggle completion when checkbox clicked', async ({ page }) => {
    const firstCheckbox = page.getByRole('checkbox').first();
    await firstCheckbox.click();
    const countEl = page.locator('#task-count');
    await expect(countEl).toContainText('1 of');
  });

  test('should show completed count in count text', async ({ page }) => {
    await expect(page.locator('#task-count')).toContainText('of');
    await expect(page.locator('#task-count')).toContainText('completed');
  });
});
