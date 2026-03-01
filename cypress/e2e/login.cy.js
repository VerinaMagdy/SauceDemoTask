import LoginPage from '../pages/LoginPage'

const loginPage = new LoginPage()

const users = [
  { username: 'standard_user', shouldPass: true },
  { username: 'locked_out_user', shouldPass: false },
  { username: 'problem_user', shouldPass: true },
  { username: 'performance_glitch_user', shouldPass: true },
  { username: 'error_user', shouldPass: true },
  { username: 'visual_user', shouldPass: true }
]

const PASSWORD = 'secret_sauce'

describe('Login Feature with all users', () => {
  beforeEach(() => {
    loginPage.visit()
  })

  users.forEach((user) => {
    it(`Login test for ${user.username}`, () => {
      loginPage.login(user.username, PASSWORD)

      if (user.shouldPass) {
        cy.url().should('include', 'inventory.html')
      } else {
        loginPage.getErrorMessage().should('be.visible')
      }
    })
  })
})
