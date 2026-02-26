const BasePage = require('./BasePage');

const SELECTORS = {
  usernameInput: '#user-name',
  passwordInput: '#password',
  loginButton: '#login-button',
  errorMessage: '[data-test="error"]',
};

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://www.saucedemo.com/';
  }

  async open() {
    await this.navigate(this.url);
  }

  async login(username, password) {
    await this.fill(SELECTORS.usernameInput, username);
    await this.fill(SELECTORS.passwordInput, password);
    await this.click(SELECTORS.loginButton);
  }

  async getErrorMessage() {
    return this.getText(SELECTORS.errorMessage);
  }

  async isErrorVisible() {
    return this.isVisible(SELECTORS.errorMessage);
  }
}

module.exports = LoginPage;
