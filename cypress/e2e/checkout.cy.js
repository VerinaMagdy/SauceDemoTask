import LoginPage from '../pages/LoginPage'
import ItemsPage from '../pages/ItemsPage'
import CheckoutPage from '../pages/CheckoutPage'

const loginPage = new LoginPage()
const itemsPage = new ItemsPage()
const checkoutPage = new CheckoutPage()

const users = [
  { username: 'standard_user', checkoutOk: true, lastNameWorks: true },
  { username: 'problem_user', checkoutOk: false, lastNameWorks: false },
  { username: 'performance_glitch_user', checkoutOk: true, lastNameWorks: true },
  { username: 'error_user', checkoutCrash: true },
  { username: 'visual_user', checkoutOk: true, lastNameWorks: true }
]

const addItemAndStartCheckout = () => {
  itemsPage.addToCartButton().eq(0).click()
  itemsPage.cartIcon().click()
  checkoutPage.checkoutButton().click()
}

describe('Checkout', () => {
  let checkoutData

  before(() => {
    cy.fixture('checkoutData').then((data) => {
      checkoutData = data
    })
  })

  users.forEach(({ username, checkoutOk, lastNameWorks, checkoutCrash }) => {
    describe(`Checkout behavior for ${username}`, () => {
      beforeEach(() => {
        loginPage.visit()
        loginPage.login(username, Cypress.env('PASSWORD'))
        cy.url().should('include', 'inventory.html')
      })

      it('Complete checkout with valid data', () => {
        if (checkoutCrash) {
          cy.on('uncaught:exception', () => false)

          addItemAndStartCheckout()

          checkoutPage.firstNameInput().type(checkoutData.valid.firstName)
          checkoutPage.lastNameInput().type(checkoutData.valid.lastName)
          checkoutPage.postalCodeInput().type(checkoutData.valid.postalCode)

          checkoutPage.continueButton().click()

          return
        }

        // for the rest of the users
        addItemAndStartCheckout()

        checkoutPage.firstNameInput().type(checkoutData.valid.firstName)
        checkoutPage.lastNameInput().type(checkoutData.valid.lastName)
        checkoutPage.postalCodeInput().type(checkoutData.valid.postalCode)

        if (!lastNameWorks) {
          checkoutPage.lastNameInput().should('have.value', '')
        }

        checkoutPage.continueButton().click()

        if (checkoutOk) {
          checkoutPage.finishButton().click()
          checkoutPage.completeMessage().should('contain', 'Thank you for your order!')
        } else {
          checkoutPage.errorMessage().should('exist')
        }
      })

      it('Checkout without required field', () => {
        if (checkoutCrash) {
          cy.on('uncaught:exception', () => false)

          addItemAndStartCheckout()

          checkoutPage.lastNameInput().type(checkoutData.missingFirstName.lastName)

          checkoutPage.postalCodeInput().type(checkoutData.missingFirstName.postalCode)

          checkoutPage.continueButton().click()

          checkoutPage.completeMessage().should('not.exist')

          return
        }

        addItemAndStartCheckout()

        // Exclude first name
        checkoutPage.lastNameInput().type(checkoutData.missingFirstName.lastName)

        checkoutPage.postalCodeInput().type(checkoutData.missingFirstName.postalCode)

        checkoutPage.continueButton().click()

        checkoutPage.errorMessage().should('exist')
      })
    })
  })
})
