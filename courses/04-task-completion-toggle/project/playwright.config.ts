import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for E2E testing
 * Tests visual output and user interactions.
 * In CI we use port 5174 to avoid conflict with a dev server on 5173.
 */
const isCI = process.env.CI === '1' || process.env.CI === 'true';
const port = process.env.PLAYWRIGHT_APP_PORT
  ? parseInt(process.env.PLAYWRIGHT_APP_PORT, 10)
  : isCI
    ? 5174
    : 5173;
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'json',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: isCI ? `npm run dev -- --port ${port}` : 'npm run dev',
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120 * 1000,
  },
});
