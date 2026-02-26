const { test, expect, request } = require('@playwright/test');
const APIutils = require('../utils/APIutils');

let token;
let oderId;
let response;
const loginPayload = { userEmail: "ayush.am77@gmail.com", userPassword: "Aashu072" }
const orderPayload = { orders: [{ country: "Brazil", productOrderedId: "6960eac0c941646b7a8b3e68" }] }

test.beforeAll(async ({ }) => {


    const apiContext = await request.newContext();
    const apiutils = new APIutils(apiContext,loginPayload);
   
    response = await apiutils.createOrder(orderPayload);


})







test("@api Login into new Applcation", async ({ page }) => {




    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    const products = page.locator(".card-body")
    const email = "ayush.am77@gmail.com";
    const productName = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client")

  

    // const oderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    // await page.locator(".em-spacer-1 .ng-star-inserted").textContent().then((text) => {
    //     console.log(text)
    // })//this is to get the order id and print it in the console

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");
    let foundOrder = false;
    for (let i = 0; i < await rows.count(); i++) {
        const rowoderID = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowoderID.trim())) {
            await rows.nth(i).locator("button").first().click();
            foundOrder = true;
            break;
        }
    }
    expect(foundOrder).toBeTruthy();
    const orderDetail = page.locator(".col-text").first();
    await orderDetail.waitFor();
    // await page.pause();

    const oderDetailID = await orderDetail.textContent();
    expect(response.orderId.includes(oderDetailID)).toBeTruthy();

});
