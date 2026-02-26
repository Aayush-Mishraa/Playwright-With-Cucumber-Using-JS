const { test, expect } = require('@playwright/test');
const {customTest}= require('../utils/test-base');
const { POMManager } = require('../PageObject/POMManager');
//Json->stringify->object
const dataSet = JSON.parse(JSON.stringify(require("../utils/PlaceOrderTestData.json")));


for (const data of dataSet) {

  test(`@web Client App login for ${data.username}`, async ({ page }) => {

    const poManager = new POMManager(page);
    //js file- Login js, DashboardPage

    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    //  await page.pause();
    await loginPage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

  });

}

customTest(`Client App login `, async ({ page ,testDataForOrder}) => {

    const poManager = new POMManager(page);
    //js file- Login js, DashboardPage

    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    //  await page.pause();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();

    
  });

  ///when we use seral mode
  // indevidual tests in the file will run in sequential manner, one after another, and the next test will start only after the previous test has completed. 
  // ]This is useful when we have tests that are dependent on each other or when we want to maintain a specific order of execution for our tests.
  //but test file will run in parallel with other test files, so if we have multiple test files, they will run simultaneously, but the tests within each file will run sequentially.