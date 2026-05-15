#!/usr/bin/env node
/**
 * Installs Chromium for Playwright E2E tests so they work out of the box.
 * Skips if PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 (e.g. in CI where browsers are cached).
 * Does not fail npm install on error (network/permission).
 */
const { execSync } = require('child_process');
if (process.env.PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD === '1') {
  process.exit(0);
}
try {
  execSync('npx playwright install chromium', {
    stdio: 'ignore',
    cwd: require('path').resolve(__dirname, '..'),
  });
} catch (_) {
  // Do not fail npm install; user can run: npm run setup:e2e
  console.warn(
    '\n⚠️  Could not install Playwright browser (network or permission).\n' +
    '   To run E2E tests and reviews later, run: npm run setup:e2e\n'
  );
}
