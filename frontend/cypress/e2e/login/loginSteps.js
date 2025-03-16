import { Given, When, Then} from 'cypress-cucumber-preprocessor/steps'

const {username, password, homeURL} = Cypress.env()

Given('I open login page', () => {
    cy.visit(homeURL)
})

When('I submit login', () => {
    cy.get('[name=email]').clear().type(username)
    cy.get('[name=password]').clear().type(password)
    cy.get('button[type="submit"]').click()
})

Then('I should see homepage', () => {
    cy.title().should('eq', 'Projects List | Mapping Workbench 2')
})
