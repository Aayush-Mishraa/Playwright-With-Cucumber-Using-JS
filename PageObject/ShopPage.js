class ShopPage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Check if a product with specific name exists on the shop page
     * @param {string} productName - Name of the product to search for
     * @returns {Promise<boolean>} - Returns true if product is found
     */
    async isProductPresent(productName) {
        const productLocator = this.page.getByRole('heading', { level: 4, name: productName });
        try {
            await productLocator.waitFor({ timeout: 5000 });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get product heading by name
     * @param {string} productName - Name of the product
     * @returns {Locator} - Product heading locator
     */
    getProductByName(productName) {
        return this.page.getByRole('heading', { level: 4, name: productName });
    }

    /**
     * Get Add to cart button for a specific product
     * @param {string} productName - Name of the product
     * @returns {Locator} - Add button locator
     */
    async getAddButtonForProduct(productName) {
        const productCard = this.page.locator(`h4:has-text('${productName}')`)
            .locator('..') // Navigate to parent
            .locator('..'); // Navigate to grandparent
        return productCard.getByRole('button', { name: 'Add' });
    }
}

module.exports = { ShopPage };
