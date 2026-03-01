import LoginPage from '../pages/LoginPage'
import ItemsPage from '../pages/ItemsPage'

const loginPage = new LoginPage()
const itemsPage = new ItemsPage()

const users = [
  { username: 'standard_user', invBadge: 1 },
  { username: 'problem_user', invBadge: 2 }, // badge number doesn't change in inventory page
  { username: 'performance_glitch_user', invBadge: 1 },
  { username: 'error_user', invBadge: 2, removeCrash: true },
  { username: 'visual_user', invBadge: 1 }
]

const addFirstTwoItems = () => {
  itemsPage.addToCartButton().eq(0).click()
  itemsPage.addToCartButton().eq(1).click()
}

const verifyCartBadge = (count) => {
  itemsPage.cartBadge().should('have.text', String(count))
}

describe('Cart', () => {
  users.forEach(({ username, invBadge, removeCrash }) => {
    describe(`Cart behavior for ${username}`, () => {
      beforeEach(() => {
        loginPage.visit()
        loginPage.login(username, Cypress.env('PASSWORD'))
        cy.url().should('include', 'inventory.html')
      })

      it('Add two items', () => {
        addFirstTwoItems()
        verifyCartBadge(2)

        itemsPage.cartIcon().click()
        cy.get('[data-test="inventory-item"]').should('have.length', 2)
      })

      it('Remove one item from inside the cart', () => {
        addFirstTwoItems()
        verifyCartBadge(2)

        itemsPage.cartIcon().click()
        cy.get('[data-test="inventory-item"]').first().find('button').click()

        cy.get('[data-test="inventory-item"]').should('have.length', 1)
        verifyCartBadge(1)
      })

      it('Remove one item from inventory page itself', () => {
        addFirstTwoItems()
        verifyCartBadge(2)

        if (removeCrash) {
          cy.once('uncaught:exception', (err) => {
            expect(err.message).to.include('Failed to remove item')
            return false
          })

          itemsPage.addToCartButton().eq(0).click()
        } else {
          itemsPage.addToCartButton().eq(0).click()
        }

        verifyCartBadge(invBadge)
      })
    })
  })
})
