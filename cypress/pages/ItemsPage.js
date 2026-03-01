class ItemsPage {
  inventoryItems() {
    return cy.get('[data-test="inventory-item"]')
  }
  inventoryItemNames() {
    return cy.get('[data-test="inventory-item-name"]')
  }

  addToCartButton() {
    return cy.get('button.btn_inventory')
  }

  cartIcon() {
    return cy.get('[data-test="shopping-cart-link"]')
  }

  cartBadge() {
    return cy.get('[data-test="shopping-cart-badge"]')
  }

  sortDropdown() {
    return cy.get('[data-test="product-sort-container"]')
  }

  inventoryItemPrices() {
    return cy.get('[data-test="inventory-item-price"]')
  }
}
export default ItemsPage
