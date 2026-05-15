import { test, expect } from '@playwright/test';

test.describe('Challenge 02: Dynamic Task Rendering - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/challenge/02-dynamic-task-rendering');
  });

  test('should display task list', async ({ page }) => {
    const taskList = page.locator('#task-list');
    await expect(taskList).toBeVisible();
  });

  test('should display at least 5 tasks', async ({ page }) => {
    const cards = page.locator('#task-card');
    await expect(cards).toHaveCount(5);
  });

  test('should display task count with id task-count', async ({ page }) => {
    const countEl = page.locator('#task-count');
    await expect(countEl).toBeVisible();
    await expect(countEl).toContainText('Tasks');
  });

  test('should show 5 Tasks in count', async ({ page }) => {
    await expect(page.locator('#task-count')).toContainText('5 Tasks');
  });

  test('should display task titles from state', async ({ page }) => {
    await expect(page.getByText('First Task')).toBeVisible();
    await expect(page.getByText('Second Task')).toBeVisible();
  });
});
