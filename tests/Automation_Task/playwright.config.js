const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    baseURL: 'http://automationexercise.com', // Set the base URL
    headless: false, // Run tests in headed mode
    viewport: { width: 1280, height: 720 }, // Default viewport size
    timeout: 50000, // Default timeout for actions
    actionTimeout: 5000, // Timeout for individual actions
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]], // Generate HTML report
  retries: 1, // Retry failed tests once
});