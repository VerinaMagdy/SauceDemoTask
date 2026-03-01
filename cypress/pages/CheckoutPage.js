class CheckoutPage {
  checkoutButton() {
    return cy.get('[data-test="checkout"]')
  }

  firstNameInput() {
    return cy.get('[data-test="firstName"]')
  }

  lastNameInput() {
    return cy.get('[data-test="lastName"]')
  }

  postalCodeInput() {
    return cy.get('[data-test="postalCode"]')
  }

  continueButton() {
    return cy.get('[data-test="continue"]')
  }

  finishButton() {
    return cy.get('[data-test="finish"]')
  }

  completeMessage() {
    return cy.get('[data-test="complete-header"]')
  }

  errorMessage() {
    return cy.get('[data-test="error"]')
  }
}

export default CheckoutPage
