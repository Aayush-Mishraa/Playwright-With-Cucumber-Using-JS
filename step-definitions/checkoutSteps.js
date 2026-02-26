const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

Given('I have {string} in my cart', async function (itemName) {
  await this.homePage.addItemToCart(itemName);
  await this.homePage.goToCart();
  this.cartPage = new CartPage(this.page);
});

When('I proceed to checkout', async function () {
  this.cartPage = this.cartPage || new CartPage(this.page);
  await this.cartPage.proceedToCheckout();
  this.checkoutPage = new CheckoutPage(this.page);
});

When(
  'I fill in shipping info with first name {string}, last name {string}, and postal code {string}',
  async function (firstName, lastName, postalCode) {
    this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
    await this.checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
  }
);

When('I continue to the order summary', async function () {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.clickContinue();
});

Then('I should see the order summary', async function () {
  const subtotal = await this.checkoutPage.getSubtotal();
  expect(subtotal).toBeTruthy();
});

When('I finish the order', async function () {
  await this.checkoutPage.clickFinish();
});

Then('I should see the order confirmation message {string}', async function (expectedMessage) {
  const header = await this.checkoutPage.getCompletionHeader();
  expect(header.trim()).toContain(expectedMessage);
});

Then('I should see a checkout error {string}', async function (expectedError) {
  const error = await this.checkoutPage.getErrorMessage();
  expect(error.trim()).toContain(expectedError);
});

When('I cancel the checkout', async function () {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.clickCancel();
});

Then('I should be on the cart page', async function () {
  const url = this.page.url();
  expect(url).toContain('/cart');
});
