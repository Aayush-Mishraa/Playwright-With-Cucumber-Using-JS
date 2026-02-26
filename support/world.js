const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');

const browsers = { chromium, firefox, webkit };

class PlaywrightWorld extends World {
  constructor(options) {
    super(options);
    this.browserName = process.env.BROWSER ||
      (this.parameters && this.parameters.browser) ||
      'chromium';
  }

  async openBrowser() {
    const browserType = browsers[this.browserName] || chromium;
    this.browser = await browserType.launch({ headless: true });
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
    });
    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }

  async takeScreenshot(name) {
    if (!this.page) return null;
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const screenshotPath = `screenshots/${name}-${uniqueId}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    return screenshotPath;
  }
}

setWorldConstructor(PlaywrightWorld);
