const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');
const CartPage = require('../pages/CartPage');

Given('I am logged in as {string}', async function (username) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.open();
  await this.loginPage.login(username, 'secret_sauce');
  this.homePage = new HomePage(this.page);
});

When('I add {string} to the cart', async function (itemName) {
  this.homePage = this.homePage || new HomePage(this.page);
  await this.homePage.addItemToCart(itemName);
});

Then('the cart badge should show {string}', async function (count) {
  const actualCount = await this.homePage.getCartItemCount();
  expect(actualCount).toBe(parseInt(count, 10));
});

When('I navigate to the cart page', async function () {
  this.homePage = this.homePage || new HomePage(this.page);
  await this.homePage.goToCart();
  this.cartPage = new CartPage(this.page);
});

Then('the cart should contain {string}', async function (itemName) {
  this.cartPage = this.cartPage || new CartPage(this.page);
  const items = await this.cartPage.getCartItems();
  expect(items).toContain(itemName);
});

When('I remove {string} from the cart', async function (itemName) {
  this.cartPage = this.cartPage || new CartPage(this.page);
  await this.cartPage.removeItem(itemName);
});

Then('the cart should be empty', async function () {
  this.cartPage = this.cartPage || new CartPage(this.page);
  const count = await this.cartPage.getCartItemCount();
  expect(count).toBe(0);
});
