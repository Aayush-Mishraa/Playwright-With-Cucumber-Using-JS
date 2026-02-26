// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({

  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 5000,

  },
  reporter: [
    ['line'],
    ['html'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',//on/off/only-on-failure
    trace: 'retain-on-failure',//on/off/retain-on-failure
    



    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

  }


});
module.exports = config
