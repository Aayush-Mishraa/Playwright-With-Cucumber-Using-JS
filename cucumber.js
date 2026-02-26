const common = {
  require: ['support/world.js', 'support/hooks.js', 'step-definitions/**/*.js'],
  format: [
    'progress-bar',
    'json:reports/cucumber-report.json',
    'allure-cucumberjs/reporter',
  ],
  formatOptions: { snippetInterface: 'async-await' },
};

module.exports = {
  default: {
    ...common,
    paths: ['features/**/*.feature'],
    parallel: parseInt(process.env.PARALLEL_WORKERS, 10) || 2,
    retry: 1,
  },
  chromium: {
    ...common,
    paths: ['features/**/*.feature'],
    worldParameters: { browser: 'chromium' },
  },
  firefox: {
    ...common,
    paths: ['features/**/*.feature'],
    worldParameters: { browser: 'firefox' },
  },
  webkit: {
    ...common,
    paths: ['features/**/*.feature'],
    worldParameters: { browser: 'webkit' },
  },
};
