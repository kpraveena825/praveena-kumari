// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import LoginPage from "../e2e/pages/LoginPage"


Cypress.Commands.add('login', () => {

    cy.fixture('users.json').then((users) => {
    const browser = Cypress.browser.name;
    let loginData = users[browser] || users['default'];
    cy.log("User name "+loginData.email);
        LoginPage.loginWithUI(loginData.email, loginData.password);
    })

})

Cypress.Commands.add('getParsedAmount', (locator) => {
  return cy.get(locator).invoke('text').then((text) => {
    const amount = parseFloat(text.replace(/,/g, '').trim());
    return amount;
  });
});
