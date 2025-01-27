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

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {

    cy.get('#firstName')
    .should('be.visible')
    .type('Samuel')
    .should('have.value', 'Samuel')

    cy.get('#lastName')
    .should('be.visible')
    .type('Henrique')
    .should('have.value', 'Henrique')

    cy.get('#email')
    .should('be.visible')
    .type('teste@gmail.com')
    .should('have.value', 'teste@gmail.com')

    cy.get('#open-text-area')
    .should('be.visible')
    .type('Teste')
    .should('have.value', 'Teste')

    cy.contains('button', 'Enviar')
    .should('be.visible')
    .click()

    cy.contains('.success', 'Mensagem enviada com sucesso')
    .should('be.visible')
})

Cypress.Commands.add('exibeMensagemErroEmailInvalido', () => {
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt, felis nec sodales elementum, risus est venenatis tortor, non egestas nisi ligula nec mauris. Donec et risus a odio condimentum tincidunt. Vestibulum in nibh eu urna volutpat faucibus. Vivamus egestas enim ut felis fringilla, non venenatis justo pretium. Aenean convallis risus nec tortor aliquam, at ullamcorper purus bibendum. Nam tristique sapien a risus finibus, non rutrum metus luctus. Phasellus vehicula nisi ac nisi pharetra, sit amet sodales erat hendrerit. Nullam at orci at eros fermentum interdum. Ut euismod enim sit amet purus sodales, ac sagittis turpis scelerisque.'
    cy.get('#firstName')
      .should('be.visible')
      .type('Samuel')
      .should('have.value', 'Samuel')

    cy.get('#lastName')
      .should('be.visible')
      .type('Henrique')
      .should('have.value', 'Henrique')

    cy.get('#email')
      .should('be.visible')
      .type('teste.gmail.com')
      .should('have.value', 'teste.gmail.com')

    cy.get('#open-text-area')
      .should('be.visible')
      .type(longText, {delay: 0})
      .should('have.value', longText)

    cy.contains('button', 'Enviar')
      .should('be.visible')
      .click()

    cy.contains('.error', 'Valide os campos obrigatórios!')
      .should('be.visible')
})
Cypress.Commands.add('UploadArquivo', () => {
  cy.get('#file-upload')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json')
    .should(($input) => {
      expect($input[0].files[0].name).to.equal('example.json')
    })
})