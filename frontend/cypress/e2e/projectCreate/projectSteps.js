import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

const { username, password, homeURL, appURLPrefix, projectName, homePageLabel } = Cypress.env();

Given('Session Login', () => {
  // Caching session when logging in via page visit
  cy.session([username, password], () => {
    cy.visit(homeURL);
    cy.get('[name=email]').clear().type(username);
    cy.get('[name=password]').clear().type(password);
    cy.get('button[type="submit"]').click();
    cy.title().should('eq', homePageLabel);
  });
});

When('I click on add project button', () => {
  cy.get('#add_button').click();
});

Then('I type project name', () => {
  cy.get('input[name=title]').clear().type(projectName);
  cy.get('input[name=identifier]').clear().type('123');
});

When('I click create button', () => {
  cy.log(appURLPrefix + '/get');
  cy.intercept('POST', appURLPrefix + 'get').as('create');
  cy.get('button[type="submit"]').click();
});

Then('I get success created', () => {
  cy.wait('@create').its('response.statusCode').should('eq', 200);
});
