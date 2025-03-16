import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

const { username, password, homeURL, appURLPrefix, projectName, homePageLabel } = Cypress.env();

const projectDescription = 'some description';

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


Then('I receive project', () => {
  cy.wait('@get').its('response.statusCode').should('eq', 200);
});

When('I select project', () => {
  // cy.intercept('POST', appURLPrefix + 'users/set_project_for_current_user_session').as('select');
  cy.get('#select_button').click();
});

Then('I get success select', () => {
  cy.wait('@select').its('response.statusCode').should('eq', 200);
});

//edit project
When('I click on edit button', () => {
  cy.get('#edit_button').click();
});

Then('I get redirected to project edit page', () => {
  cy.url().should('include', '/edit');
});

Then('I update project description', () => {
  cy.get('input[name=description]')
    .clear()
    .type(projectDescription);
});

Then('I click on update button', () => {
  cy.intercept('PUT', appURLPrefix + '/put').as('updateProject');
  cy.get('button[type="submit"]').click();
});

Then('I receive update success', () => {
  cy.wait('@updateProject').its('response.statusCode').should('eq', 200);
});

//edit project
When('I click on view button', () => {
  cy.get('#view_button').click();
});

Then('I get redirected to project view page', () => {
  cy.url().should('include', '/view');
});

Then('I read description', () => {
  cy.get('h6:contains("Description")')
    .first()
    .next()
    .should('have.text', projectDescription + '\n');
});

//delete project
When('I click on delete button', () => {
  cy.get('#delete_button').click();
});

Then('I click yes button', () => {
  cy.intercept('DELETE', appURLPrefix + 'delete').as('delete');
  cy.get('#yes_dialog_button').click({force:true});
});

Then('I get success delete', () => {
  cy.wait('@delete').its('response.statusCode').should('eq', 200);
});
