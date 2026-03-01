class LoginPage {
  visit() {
    cy.visit('/')
  }

  usernameField() {
    return cy.get('[data-test="username"]')
  }

  passwordField() {
    return cy.get('[data-test="password"]')
  }

  loginButton() {
    return cy.get('[data-test="login-button"]')
  }

  getErrorMessage() {
    return cy.get('[data-test="error"]')
  }

  login(username, password) {
    this.usernameField().type(username)
    this.passwordField().type(password)
    this.loginButton().click()
  }
}

export default LoginPage
