# SauceDemoTask
Cypress E2E Automation – SauceDemo  End-to-end test automation project built with Cypress for SauceDemo. Covers login, cart functionality, checkout flow, sorting behavior, and multi-user persona validation including known buggy users. Implements Page Object Model, fixtures, reusable helpers, and structured test architecture.

SauceDemo Cypress E2E Automation

End-to-end test automation project built with Cypress for https://www.saucedemo.com

Features Covered

- Login validation

- Cart (add/remove items & badge validation)

- Checkout flow (required field validation & postal code verification)

- Sorting (Name & Price)

- Multi-user testing

- Test reporting

Project follows:

- Page Object Model (POM)

- Fixture-based test data

- Reusable helper functions

- Clean and scalable structure

**Installation**

Clone the repository:

- git clone https://github.com/VerinaMagdy/SauceDemoTask.git
- cd cypress

**Install dependencies**
- npm install

**Run Tests**

- npx cypress run

**Run in interactive mode**
- npx cypress open


📊 **Test Reporting**

This project uses Mochawesome Reporter.

run: npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator cypress-mochawesome-reporter



**How to Generate the Report**
Run: npx cypress run

The report will be generated automatically after execution.
Open the HTML report at: cypress/reports/html/index.html

The report includes:

Test summary
- Pass/Fail status
- Execution time
- Failure details
