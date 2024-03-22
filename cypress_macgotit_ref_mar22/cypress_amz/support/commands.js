// require('cypress-xpath');
require('cypress-plugin-tab')
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

//If Keep hackers out page is displayed, click on Skip button
Cypress.Commands.add('elementExists', (selector,textToVerify) => {
  //Element exists or not: https://stackoverflow.com/questions/56145926/how-to-check-if-element-exists-using-cypress-io
  cy.get('body').then($body => {
    if ($body.find(selector).length) {
        //Do something if exist
        cy.get(selector).should('contains.text', textToVerify);
        cy.get('#ap-account-fixup-phone-skip-link').click();
    }
    else{
        //do if not exist
    }
})
});