const DEFAULT_TIMEOUT = 10000;

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async getTitle() {
    return this.page.title();
  }

  async waitForSelector(selector, options = {}) {
    await this.page.waitForSelector(selector, { timeout: DEFAULT_TIMEOUT, ...options });
  }

  async click(selector) {
    await this.waitForSelector(selector);
    await this.page.click(selector);
  }

  async fill(selector, value) {
    await this.waitForSelector(selector);
    await this.page.fill(selector, value);
  }

  async getText(selector) {
    await this.waitForSelector(selector);
    return this.page.textContent(selector);
  }

  async isVisible(selector) {
    return this.page.isVisible(selector);
  }
}

module.exports = BasePage;
