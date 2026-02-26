class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator("#login")
        this.password = page.locator("#userPassword")
        this.username = page.locator("#userEmail")
    }


    async validLogin(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
       
    }
    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client")

    }




}

module.exports = { LoginPage };