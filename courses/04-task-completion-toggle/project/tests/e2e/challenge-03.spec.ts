import { test, expect } from '@playwright/test';

test.describe('Challenge 03: Adding New Tasks - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/challenge/03-adding-new-tasks');
  });

  test('should display task form', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Add Task/i })).toBeVisible();
    await expect(page.locator('#task-title')).toBeVisible();
  });

  test('should add task when title filled and submitted', async ({ page }) => {
    await page.locator('#task-title').fill('E2E New Task');
    await page.getByRole('button', { name: /Add Task/i }).click();
    await expect(page.getByText('E2E New Task')).toBeVisible();
  });

  test('should show error when submitting empty title', async ({ page }) => {
    await page.getByRole('button', { name: /Add Task/i }).click();
    await expect(page.locator('#task-form-error')).toBeVisible();
    await expect(page.getByText(/Title is required/i)).toBeVisible();
  });

  test('should clear form after adding task', async ({ page }) => {
    await page.locator('#task-title').fill('Clear Test');
    await page.getByRole('button', { name: /Add Task/i }).click();
    await expect(page.locator('#task-title')).toHaveValue('');
  });
});
