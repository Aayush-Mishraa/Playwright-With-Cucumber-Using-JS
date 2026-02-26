const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html',
  metadata: {
    browser: {
      name: process.env.BROWSER || 'chromium',
      version: 'latest',
    },
    device: 'Local Machine',
    platform: {
      name: process.platform,
    },
  },
  customData: {
    title: 'Test Execution Info',
    data: [
      { label: 'Project', value: 'Playwright + Cucumber BDD Framework' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Start Time', value: new Date().toLocaleString() },
    ],
  },
});
