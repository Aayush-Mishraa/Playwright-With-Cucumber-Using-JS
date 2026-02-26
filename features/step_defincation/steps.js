const { Given, When, Then } = require('@cucumber/cucumber');
const { POMManager } = require('../../PageObject/POMManager');
const { expect } = require('@playwright/test');
const playwright = require('playwright/test');

Given('Loging to ecommerce website with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {


    //js file- Login js, DashboardPage  
    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();

    await loginPage.goTo();
    //  await page.pause();
    await loginPage.validLogin(username, password);

});

When('Add {string} to cart', { timeout: 100 * 1000 }, async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('verify {string} is added to cart', { timeout: 100 * 1000 }, async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);

    await cartPage.Checkout();
});


When('When enter the valide details and place the order', { timeout: 100 * 1000 }, async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});


Then('verify order is presnt in the order history page', async function () {
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

Given('Loging to ecommerce2 website with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    const usernameLocator = this.page.locator("#username")
    const passwordLocator = this.page.locator("#password")
    const loginButton = this.page.locator("#signInBtn")
    await usernameLocator.fill(username);
    await passwordLocator.fill(password);

    await loginButton.click();

});
Then('Verify the error message is displayed for invalid credentials', { timeout: 100 * 1000 }, async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(await this.page.locator("[style*='block']").textContent()).toContain("Incorrect");
});