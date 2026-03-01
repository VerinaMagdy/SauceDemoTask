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
  { username: 'error_user', checkoutOk: true, lastNameWorks: true },
  { username: 'visual_user', checkoutOk: true, lastNameWorks: true }
]

const PASSWORD = 'secret_sauce'

const addItemAndStartCheckout = () => {
  itemsPage.addToCartButton().eq(0).click()
  itemsPage.cartIcon().click()
  checkoutPage.checkoutButton().click()
}

describe('Checkout Feature', () => {
  let checkoutData

  before(() => {
    cy.fixture('checkoutData').then((data) => {
      checkoutData = data
    })
  })

  users.forEach(({ username, checkoutOk, lastNameWorks }) => {
    describe(`Checkout behavior for ${username}`, () => {
      beforeEach(() => {
        loginPage.visit()
        loginPage.login(username, PASSWORD)
        cy.url().should('include', 'inventory.html')
      })

      it('Complete checkout with valid data', () => {
        if (username === 'error_user') {
          cy.log('Skipping for error_user')
          return
        }

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
          checkoutPage.errorMessage().should('exist') // for problem_user it will not continue as lastname is broken
        }
      })

      it('Checkout without required field', () => {
        if (username === 'error_user') {
          cy.log('Skipping for error_user')
          return
        }

        addItemAndStartCheckout()

        //  exclude first name

        checkoutPage.lastNameInput().type(checkoutData.missingFirstName.lastName)

        checkoutPage.postalCodeInput().type(checkoutData.missingFirstName.postalCode)

        checkoutPage.postalCodeInput().type(checkoutData.missingFirstName.postalCode)

        checkoutPage.continueButton().click()

        checkoutPage.errorMessage().should('exist')
      })
    })
  })
})
