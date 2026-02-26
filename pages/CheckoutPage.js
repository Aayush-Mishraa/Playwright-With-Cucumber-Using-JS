const BasePage = require('./BasePage');

const SELECTORS = {
  firstNameInput: '[data-test="firstName"]',
  lastNameInput: '[data-test="lastName"]',
  postalCodeInput: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  finishButton: '[data-test="finish"]',
  cancelButton: '[data-test="cancel"]',
  summarySubtotal: '.summary_subtotal_label',
  summaryTotal: '.summary_total_label',
  completionHeader: '.complete-header',
  completionText: '.complete-text',
  errorMessage: '[data-test="error"]',
  itemSummary: '.cart_item',
  summaryItemName: '.inventory_item_name',
};

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async fillShippingInfo(firstName, lastName, postalCode) {
    await this.fill(SELECTORS.firstNameInput, firstName);
    await this.fill(SELECTORS.lastNameInput, lastName);
    await this.fill(SELECTORS.postalCodeInput, postalCode);
  }

  async clickContinue() {
    await this.click(SELECTORS.continueButton);
  }

  async clickFinish() {
    await this.click(SELECTORS.finishButton);
  }

  async clickCancel() {
    await this.click(SELECTORS.cancelButton);
  }

  async getSubtotal() {
    return this.getText(SELECTORS.summarySubtotal);
  }

  async getTotal() {
    return this.getText(SELECTORS.summaryTotal);
  }

  async getCompletionHeader() {
    return this.getText(SELECTORS.completionHeader);
  }

  async getCompletionText() {
    return this.getText(SELECTORS.completionText);
  }

  async isOrderComplete() {
    return this.isVisible(SELECTORS.completionHeader);
  }

  async getErrorMessage() {
    return this.getText(SELECTORS.errorMessage);
  }

  async getSummaryItems() {
    return this.page.$$eval(SELECTORS.summaryItemName, (els) =>
      els.map((el) => el.textContent.trim())
    );
  }
}

module.exports = CheckoutPage;
