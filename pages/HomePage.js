const BasePage = require('./BasePage');

const SELECTORS = {
  inventoryContainer: '.inventory_container',
  inventoryItem: '.inventory_item',
  itemTitle: (name) => `.inventory_item_name:text("${name}")`,
  addToCartButton: (name) =>
    `[data-test="add-to-cart-${name.toLowerCase().replace(/\s+/g, '-')}"]`,
  cartBadge: '.shopping_cart_badge',
  cartLink: '.shopping_cart_link',
  sortDropdown: '.product_sort_container',
};

class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async isInventoryDisplayed() {
    return this.isVisible(SELECTORS.inventoryContainer);
  }

  async addItemToCart(itemName) {
    await this.click(SELECTORS.addToCartButton(itemName));
  }

  async getCartItemCount() {
    const visible = await this.isVisible(SELECTORS.cartBadge);
    if (!visible) return 0;
    const text = await this.getText(SELECTORS.cartBadge);
    return parseInt(text, 10);
  }

  async goToCart() {
    await this.click(SELECTORS.cartLink);
  }

  async sortProducts(option) {
    await this.page.selectOption(SELECTORS.sortDropdown, option);
  }
}

module.exports = HomePage;
