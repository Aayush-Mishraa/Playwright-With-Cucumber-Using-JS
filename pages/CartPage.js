const BasePage = require('./BasePage');

const SELECTORS = {
  cartItem: '.cart_item',
  cartItemName: '.inventory_item_name',
  removeButton: (name) =>
    `[data-test="remove-${name.toLowerCase().replace(/\s+/g, '-')}"]`,
  checkoutButton: '[data-test="checkout"]',
  continueShoppingButton: '[data-test="continue-shopping"]',
  cartQuantity: '.cart_quantity',
  cartTitle: '.title',
};

class CartPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async getCartItems() {
    await this.waitForSelector(SELECTORS.cartTitle);
    return this.page.$$eval(SELECTORS.cartItemName, (els) =>
      els.map((el) => el.textContent.trim())
    );
  }

  async removeItem(itemName) {
    await this.click(SELECTORS.removeButton(itemName));
  }

  async proceedToCheckout() {
    await this.click(SELECTORS.checkoutButton);
  }

  async continueShopping() {
    await this.click(SELECTORS.continueShoppingButton);
  }

  async getCartItemCount() {
    const items = await this.page.$$(SELECTORS.cartItem);
    return items.length;
  }
}

module.exports = CartPage;
