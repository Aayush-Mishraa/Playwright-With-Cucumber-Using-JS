class LoginPagePractise {
    constructor(page) {
        this.page = page;
        this.usernameField = page.getByRole('textbox', { name: 'Username:' });
        this.passwordField = page.getByRole('textbox', { name: 'Password:' });
        this.termsCheckbox = page.getByRole('checkbox', { name: 'I Agree to the terms and' });
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    }

    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
    }

    async acceptTerms() {
        await this.termsCheckbox.check();
    }

    async clickSignIn() {
        await this.signInButton.click();
        // Wait for navigation to shop page
        await this.page.waitForURL(/angularpractice\/shop/, { waitUntil: 'networkidle' });
    }
}

module.exports = { LoginPagePractise };
