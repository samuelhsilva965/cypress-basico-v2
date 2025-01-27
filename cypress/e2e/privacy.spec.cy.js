/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT - Política de privacidade', () => {

    beforeEach(() => {
      cy.visit('./src/privacy.html')
    });
    
  
    it('verifica o título da aplicação', () => {
      cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
  })