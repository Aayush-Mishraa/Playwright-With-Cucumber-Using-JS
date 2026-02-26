const { Before, After, BeforeStep,AfterStep,status } = require('@cucumber/cucumber');
const { POMManager } = require('../../PageObject/POMManager');
const playwright = require('playwright/test');


Before(async function () {

    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POMManager(this.page);
})
BeforeStep(async function () {
    console.log("I am executing before each step");
})
AfterStep(async function ({result}) {
    if(result.status === "FAILED"){
        await this.page.screenshot({path: `./Screenshots/${Date.now()}.png`, fullPage: true});
    }
  
})

After(function () {
    console.log("I am executing after all the scenarios");
})

