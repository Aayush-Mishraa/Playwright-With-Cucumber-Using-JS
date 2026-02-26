const { Before, After, AfterStep, Status } = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');

const MAX_FILENAME_LENGTH = 50;

Before(async function () {
  await this.openBrowser();
});

AfterStep(async function ({ result, pickleStep }) {
  if (result.status === Status.FAILED) {
    const stepName = (pickleStep && pickleStep.text)
      ? pickleStep.text.replace(/[^a-z0-9]/gi, '_').substring(0, MAX_FILENAME_LENGTH)
      : 'step';
    const screenshotPath = await this.takeScreenshot(`FAILED_${stepName}`);
    if (screenshotPath && fs.existsSync(screenshotPath)) {
      const imageData = fs.readFileSync(screenshotPath);
      this.attach(imageData, 'image/png');
    }
  }
});

After(async function ({ result, pickle }) {
  if (result.status === Status.FAILED) {
    const scenarioName = pickle.name.replace(/[^a-z0-9]/gi, '_').substring(0, MAX_FILENAME_LENGTH);
    const screenshotPath = await this.takeScreenshot(`FAILED_scenario_${scenarioName}`);
    if (screenshotPath && fs.existsSync(screenshotPath)) {
      const imageData = fs.readFileSync(screenshotPath);
      this.attach(imageData, 'image/png');
    }
  }
  await this.closeBrowser();
});

// Ensure directories exist
const dirs = ['screenshots', 'reports', 'allure-results'];
dirs.forEach((dir) => {
  const dirPath = path.resolve(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});
