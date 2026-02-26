const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');

Given('I am on the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.open();
});

When('I login with username {string} and password {string}', async function (username, password) {
  this.loginPage = this.loginPage || new LoginPage(this.page);
  await this.loginPage.login(username, password);
});

Then('I should be redirected to the inventory page', async function () {
  this.homePage = new HomePage(this.page);
  const isDisplayed = await this.homePage.isInventoryDisplayed();
  expect(isDisplayed).toBe(true);
});

Then('I should see an error message {string}', async function (expectedMessage) {
  const errorVisible = await this.loginPage.isErrorVisible();
  expect(errorVisible).toBe(true);
  const actualMessage = await this.loginPage.getErrorMessage();
  expect(actualMessage.trim()).toContain(expectedMessage);
});
