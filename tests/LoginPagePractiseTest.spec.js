const { test, expect } = require('@playwright/test');
const { LoginPagePractise } = require('../PageObject/LoginPagePractise');
const { ShopPage } = require('../PageObject/ShopPage');

test.describe('@web Login Page Practise Suite', () => {
    
    test('@web Login and Verify iPhone X Product - Happy Path', async ({ page }) => {
        // Setup Page Objects
        const loginPage = new LoginPagePractise(page);
        const shopPage = new ShopPage(page);

        // Navigate to login page
        await loginPage.goTo();

        // Perform login actions
        const username = "rahulshettyacademy";
        const password = "Learning@830$3mK2"; // Updated password from the page hint
        
        await loginPage.login(username, password);
        await loginPage.acceptTerms();
        await loginPage.clickSignIn();

        // Verify we are on the shop page
        await expect(page).toHaveURL(/angularpractice\/shop/);

        // Verify iPhone X product is present
        const isIphoneXPresent = await shopPage.isProductPresent("iphone X");
        expect(isIphoneXPresent).toBeTruthy();

        // Additional verification - check product heading is visible
        const iphoneXHeading = shopPage.getProductByName("iphone X");
        await expect(iphoneXHeading).toBeVisible();

        console.log("✅ Test passed: iPhone X product found on shop page");
    });
});
