import LoginPage from '../pages/LoginPage'
import ItemsPage from '../pages/ItemsPage'

const loginPage = new LoginPage()
const itemsPage = new ItemsPage()

const USERNAME = 'standard_user'
const PASSWORD = 'secret_sauce'

describe('Sorting Feature', () => {
  beforeEach(() => {
    loginPage.visit()
    loginPage.login(USERNAME, PASSWORD)
    cy.url().should('include', '/inventory.html')
  })

  const verifyAlphabeticalSort = (order = 'asc') => {
    itemsPage.inventoryItemNames().then(($elements) => {
      const names = $elements.toArray().map((el) => el.innerText.trim())

      const sorted = [...names].sort()

      if (order === 'desc') {
        sorted.reverse()
      }

      expect(names).to.deep.equal(sorted)
    })
  }

  const verifyPriceSort = (order = 'asc') => {
    itemsPage.inventoryItemPrices().then(($elements) => {
      const prices = $elements.toArray().map((el) => Number(el.innerText.replace('$', '')))

      const sorted = [...prices].sort((a, b) => (order === 'asc' ? a - b : b - a))

      expect(prices).to.deep.equal(sorted)
    })
  }

  it('Sort by Name A → Z', () => {
    itemsPage.sortDropdown().select('Name (A to Z)')
    verifyAlphabeticalSort('asc')
  })

  it('Sort by Name Z → A', () => {
    itemsPage.sortDropdown().select('Name (Z to A)')
    verifyAlphabeticalSort('desc')
  })

  it('Sort by Price Low → High', () => {
    itemsPage.sortDropdown().select('Price (low to high)')
    verifyPriceSort('asc')
  })

  it('Sort by Price High → Low', () => {
    itemsPage.sortDropdown().select('Price (high to low)')
    verifyPriceSort('desc')
  })
})
