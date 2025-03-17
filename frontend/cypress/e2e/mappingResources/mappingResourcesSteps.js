import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

const { username, password, homeURL, appURLPrefix, projectName, homePageLabel, rmlFile } =
  Cypress.env();
let sessionProject = '';

Given('Session Login', () => {
  // Caching session when logging in via page visit
  cy.session([username, password], () => {
    cy.visit(homeURL);
    cy.get('[name=email]').clear().type(username);
    cy.get('[name=password]').clear().type(password);
    cy.get('button[type="submit"]').click();
    cy.title().should('eq', homePageLabel);
  });
  if (sessionProject)
    cy.window().then((win) => win.sessionStorage.setItem('sessionProject', sessionProject));
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

Then('I click on mapping resources', () => {
  cy.get('#nav_mapping_resources').click();
});

Then('I get redirected to mapping resources page', () => {
  cy.title().should('eq', 'App: Resource Manager | Mapping Workbench 2');
});

Then('I click on upload resource button', () => {
  cy.get('#upload_button').click();
});

Then('I select file', () => {
  cy.get('.MuiBox-root > input').selectFile(rmlFile, { force: true });
});

Then('I click on upload file button', () => {
  cy.intercept('POST', appURLPrefix + 'post').as('upload');
  cy.get('#file_upload_button').click();
});

Then('I get successfully upload', () => {
  cy.wait('@upload').its('response.statusCode').should('eq', 200);
});

Then('I enter file name', () => {
  cy.get('input[name=itemName]')
    .clear()
    .type(rmlFile + '{enter}');
});

When('I select project', () => {
  // cy.intercept('POST', appURLPrefix + 'users/set_project_for_current_user_session').as('select');
  cy.get('#select_button').click();
});

Then('I click on actions button', () => {
  cy.get('#actions-menu-button').first().click();
});

Then('I click on edit button', () => {
  cy.get('#edit_menu_item').click();
});

Then('I get redirected to edit page', () => {
  cy.title().should('eq', 'App: Edit Resource Manager | Mapping Workbench 2');
});

Then('I update title', () => {
  cy.get('input[name=title]')
    .clear()
    .type(rmlFile + '1');
});

Then('I click on update button', () => {
  cy.intercept('PUT', appURLPrefix + 'put').as('update');
  cy.get('button[type=submit]').click();
});

Then('I get successfully update', () => {
  cy.wait('@update').its('response.statusCode').should('eq', 200);
});

Then('I enter updated file name', () => {
  cy.get('input[name=itemName]')
    .clear()
    .type(rmlFile + '1{enter}');
});

Then('I click on delete button', () => {
  cy.get('#delete_menu_item').click();
});


Then('I click yes button', () => {
  cy.intercept('POST', appURLPrefix + 'post').as('delete');
  cy.get('#yes_dialog_button').click({force:true});
});



Then('I get success delete', () => {
  cy.wait('@delete').its('response.statusCode').should('eq', 200);
});
